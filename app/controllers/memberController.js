const { Member, Play, Instrument, Level } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const memberController = {
    // Get all members
    getAllMembers: async (req, res, next) => {
        try {
            const members = await Member.findAll({
                include: ['member_city', {
                    association: 'plays',
                    include: ['instrument', 'level']
            }]});
            res.json(members);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one member
    getOneMember: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const member = await Member.findByPk(targetId);

            // Soit le membre existe : Soit il n'existe pas
            if (member) {
                res.json(member);
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Create a member
    createMember: async (request, res, next) => {
        try {
            // req.body contient les informations nécessaires pour créer 
            // un nouveau membre
             const passwordHashed = await bcrypt.hash(request.body.user_password, 10);
            //  console.log(request.body.user_password);
            console.log(passwordHashed);
            const newMember = await Member.create({
               firstname: request.body.firstname,
               lastname: request.body.lastname,
               email: request.body.email,
               birthdate: request.body.birthdate,
               user_password: passwordHashed,
               city_id: request.body.city_id,
               
            });
            
            //  const newMember = await Member.create(req.body);
            
            

           res.json(newMember);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    updateOneMember: async (req, res, next) => {
        try {
            // On utilise l'id de la cible, dans les params d'url
            const targetId = req.params.id;
            
            // on passe par une instance
            const memberToUpdate = await Member.findByPk(targetId);
            if (!memberToUpdate) {
                return next(); // <= pas de liste, 404
            }

            // Et les nouvelles valeurs des props, dans le body
            await memberToUpdate.update(req.body);
            // l'objet est à jour, on le renvoie
            res.json(memberToUpdate);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },

    deleteOneMember: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const nbDeletedMember = await Member.destroy({
                where: {
                    id: targetId
                }
            });

            // Si y'a au moins 1 membre de supprimer alors :
            if (nbDeletedMember > 0) {
                res.json({message: "ok, membre supprimé"});
            } else {
                next(); // On envoie une 404
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    loginMember : async (req, res) => {

        const jwtSecret = process.env.TOKEN_SECRET;
          
        const { email, password } = req.body;
        console.log(req.body)

        const members = await Member.findAll();
        
      
        // authentication
        const member = members.find(member => member.email === email && member.user_password === password)

        if (member) {
        const jwtContent = { memberId: member.id };
        const jwtOptions = { 
        algorithm: 'HS256', 
        expiresIn: '3h' 
    };
        res.json({
          id: member.id,
          email: member.email,
          password: member.user_password,
          firstname: member.firstname,
          lastname: member.lastname,
          description: member.user_description,
          birthdate: member.birthdate,
          profil_image: member.profil_image,
          city_id: member.city_id,
          token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
        });
      } else {
            console.log('<< 401');
            res.sendStatus(401);
           }
      }
       
        
    
};

module.exports = memberController;