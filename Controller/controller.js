const countryModel = require('../Model/country.model');
const stateModel = require('../Model/state.model')
const cityModel = require('../Model/city.model');
const userModel = require('../Model/user.model');

// country
exports.country = async (req, res) => {
    res.render('country')
}
exports.state = async (req, res) => {
    let countryData = await countryModel.find({ isDelete: false })
    // console.log(countryData);
    res.render('state', { response: countryData });
}
exports.city = async (req, res) => {
    let stateData = await stateModel.find({ isDelete: false });
    res.render('city', { response: stateData });
}
exports.useradd = async (req, res) => {
    let countryData = await countryModel.find({ isDelete: false })

    // let stateData = await stateModel.find({ isDelete: false });
    res.render('useradd', { response: countryData });
}
exports.showUser = async (req, res) => {
    
    try {
        let userData = await userModel.aggregate([
            { $match: { "isDelete": false } },
            {
                "$lookup": {
                    from: "countries",
                    let: { country: '$country_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$country'] }
                                    ]
                                }
                            }
    
                        }
                    ],
                    as: "CountryData"
                }
            },
            {
                "$lookup": {
                    from: "states",
                    let: { state: '$state_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$state'] }
                                    ]
                                }
                            }
    
                        }
                    ],
                    as: "StateData"
                }
            },
            {
                $lookup:{
                    from:"cities",
                    let : {city:'$city_id'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        {$eq:['$_id','$$city']}
                                    ]
                                }
                            }
                        }
                    ],
                    as:'cityData'
                }
            },
            {
                "$unwind": {
                    path: "$CountryData"
                }
            },
            {
                "$unwind": {
                    path: "$StateData"
                }
            },
            {
                "$unwind": {
                    path: "$cityData"
                }
            },
            { $project : {name:1,CountryData : "$CountryData.country",StateData : "$StateData.title", cityData : "$cityData.title"  } }
        ])
       
        // console.log(userData);
        res.render('showUser', { response: userData });
    } catch (error) {
        console.log(error);
    }
}


// COUNTERY POST
exports.country_post = async (req, res) => {
    // console.log('body', req.body);
    let save = await countryModel.create(req.body);
    if (save && save._id) {
        console.log('save Succefully', save);
        res.redirect('/state');
    } else {
        console.log('not save', save);
    }
}
exports.state_post = async (req, res) => {
    // console.log('state body', req.body);
    let save = await stateModel.create(req.body);
    if (save && save._id) {
        console.log('state save Succefully', save);
        res.redirect('/city');
    } else {
        console.log('state is not save', save);
    }
}

exports.city_post = async (req, res) => {
    // console.log('city body',req.body);
    let save = await cityModel.create(req.body);
    if (save && save._id) {
        console.log('city save Succefully', save);
        res.redirect('/city');
    } else {
        console.log('city is not save', save);
    }
}


exports.countryWiseState = async (req, res) => {
    // console.log('countryWiseState',req.body);
    const countryID = req.body._id
    if (countryID) {
        let states = await stateModel.find({ country_id: countryID })

        if (states) {

            return res.status(200).json({
                status: 'success',
                result: states,
                message: 'state data found',
            });
        } else {
            return res.status(400).json({
                status: 'failed',
                message: "this country's state is not define",
            });
        }

    } else {
        return res.status(400).json({
            status: 'failed',
            message: "Country Id is not found",
        });
    }
}
exports.StateWiseCity = async (req, res) => {
    const StateID = req.body._id
    // console.log('StateWiseCity',StateID);
    if (StateID) {
        let citys = await cityModel.find({ state_id: StateID })

        console.log('city',citys);

        if (citys) {
            return res.status(200).json({
                status: 'success',
                result: citys,
                message: 'city data found',
            });
        } else {
            return res.status(400).json({
                status: 'failed',
                message: "this State's city is not define",
            });
        }

    } else {
        return res.status(400).json({
            status: 'failed',
            message: "State Id is not found",
        });
    }
}

exports.user_post = async (req, res) => {
    console.log('user Body', req.body);
    let user = await userModel.create(req.body);
    if (user && user._id) {
        console.log('user save success', user);
        res.redirect('/showUser')
    } else {
        console.log('user save failed', user);
    }
}