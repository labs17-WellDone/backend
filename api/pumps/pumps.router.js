const router = require("express").Router();

const Pumps = require("./pumps.model");



//POST a pump - WORKING
router.post('/', (req,res) => {
    const pumpData = req.body;
    console.log('pumpData', pumpData)
    Pumps.addPump(pumpData)
        .then(pump => {
            res.status(201).json(pump)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
} )

//GET pumps - WORKING
// router.get('/', (req,res) => {
//     Pumps.getPumps()
//         .then(pumps => {
//             const listPumps = []
//             pumps.map(eachPump => {
//                 // console.log('eachPump', eachPump)
//                 const pumpsInfo = {
//                     pump: {
//                         id: eachPump.id,
//                         country_name: eachPump.country_name,
//                         province_name: eachPump.province_name,
//                         commune_name: eachPump.commune_name,
//                         district_name: eachPump.district_name,
//                         latitude: eachPump.latitude,
//                         longitude: eachPump.longitude,
//                         organization: {
//                             organization_id: eachPump.org_id,
//                             organization_name: eachPump.org_name,
//                             headquarter_city: eachPump.headquarter_city,
//                             accounts: {
//                                 accounts_id: eachPump.accounts_id,
//                                 first_name: eachPump.first_name,
//                                 last_name: eachPump.last_name,
//                                 email_address: eachPump.email_address,
//                                 mobile_number: eachPump.mobile_number,
//                                 super_user: eachPump.super_user,
//                                 org_user: eachPump.org_user,
//                                 org_admin: eachPump.org_admin
//                                     }
//                                 }
//                             }
//                 }
//                 console.log(pumpsInfo)
//                 return listPumps.push(pumpsInfo)
//             })
//             console.log('fores')
//             console.log('listPump', listPumps)
//             res.status(200).json(listPumps)
            
//         })
    
//         .catch(err => {
//             res.status(500).json(err.message)
//         })
// })

// this router gets pumps and associated accounts & org
// router.get("/", async (req,res) => {
//     try {
//         const pumps = await Pumps.getPumps();
//         res.status(200).json(pumps)
//     } catch (err) {
//         res.status(400).json(err.message)
//     }
// })

//this router gets just pumps
router.get("/", async (req,res) => {
    try {
        const pumps = await Pumps.findPumps();
        res.status(200).json(pumps)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

// router.get("/", async (req, res) => {
//     try {
//       const sms_notification = await SMS_Notification.find();
//       res.status(200).json(sms_notification);
//     } catch (err) {
//       console.log(err.message);
//       res.status(400).json(err.message);
//     }
//   });

//get pump by id working 
//GET a pump by id - WORKING
router.get('/:id', (req,res) => {
    const {id} = req.params;
    Pumps.getPumpById(id)
        .then(pump => {
            if(pump){
                res.status(200).json(pump)
            }
            else res.status(404).json({message: 'pump does not exist'})
            
        })
        .catch(err => res.status(500).json(err.message))
})

// //UPDATE a pump - WORKING
// router.put('/:id', (req,res) => {
//     const change = req.body;
//     const {id} = req.params;
//     Pumps.getPumpById(id)
//         .then(pump => {
//             if (pump){
//                 Pumps.updatePump(id, change)
//                     .then(count => {
//                         res.status(200).json({message: `updated ${count} pump`})
//                     })
//                     .catch(err => res.status(500).json(err))
//                 }
//             else {res.status(404).json({message: 'pump does not exist'})}
//             })
//         .catch(err => res.json(err.message))
    
// })

// update pump working 
// update pump - WORKING but doesnt return a message on Postman/Insomnia
router.put("/:id", 
// authenticate, 
async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await Pumps.updatePump(changes, id);
    res.status(200).json({message: "Pump edited successfully."});
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
})
// update delete working
//DELETE a pump
router.delete('/:id', (req,res) => {
    const {id} = req.params;
    console.log('id',id)
    Pumps.getPumpById(id)
        .then(pump => {
            console.log(pump)
            if (pump){
                Pumps.deletePump(id)
                    .then(count => {
                        console.log('fired')
                        res.status(200).json({message: `deleted ${count} pump`})
                    })
                    .catch(err => res.status(500).json(err))
                }
            else {res.status(404).json({message: 'pump does not exist'})}
            })
        .catch(err => res.status(500).json(err.message))
    // Pumps.deletePump(id)
    //     .then(count => {
    //         console.log('count', count)
    //         res.status(200).json({message: `deleted ${count} pump`})
    //     })
    //     .catch(err => res.status(500).json({message: 'something wrong'}))
    
})

//These routes are to test get pumps
//POST an Org
// router.post('/org', (req,res) => {
//     const orgData = req.body;
//     console.log('orgData', orgData)
//     Pumps.addOrg(orgData)
//         .then(org => {
//             res.status(201).json(org)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
// } )

//GET pumps by orgs
router.get('/org/:id', (req,res) => {
    const {id} = req.params
    Pumps.getPumpsByOrgId(id)
        .then(pumps => {
            console.log('pumps', pumps)
            res.status(200).json(pumps)
        })
        .catch(err => {
            res.status(500).json({message: "Fail to retrieve orgs"})
        })
})



module.exports = router;
