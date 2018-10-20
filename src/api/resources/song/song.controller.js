import joi from 'joi';
import Song from './song.model';
export default {
    async create(req, res) {
        try {
            const schema = joi.object().keys({
                title: joi.string().required(),
                url: joi.string().required(),
                rating: joi.number().integer().min(0).max(5).optional(),
            });
            const { value, error} = joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            }
                 const song = await Song.create(value);
                return  res.json(song);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    },
    async findAll(req,res){
        console.log("Hit");
        try {
            const {page ,perPage} = req.query;
            const options = {
                page : parseInt(page, 10) || 1,
                limit : parseInt(perPage, 10) || 10,
            };
          const song = await Song.paginate({},options);
          return  res.json(song);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async findOne(req,res){
        try {
        const { id } = req.params;
         const song = await Song.findById(id);
         if(!song)
         return res.status(404).json({error : "Could not find song"});
         return  res.json(song);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    async delete(req,res){
        try {
            const { id } = req.params;
            const song = await Song.findOneAndRemove({_id :id});
            if(!song)
            return res.status(404).json({error: "Could not find song"});
            return res.json(song);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    async update(req,res){
        try {
            const { id } = req.params;
            const schema = joi.object().keys({
            title: joi.string().required(),
            url : joi.string().required(),
            rating : joi.number().integer().min(0).max(5).optional(),
            });
            const { value,error } = joi.validate(req.body, schema);
            if(error && error.details)
            return res.status(400).json(error);

         const song = await Song.findOneAndUpdate({_id : id}, value, {new:true});
         if(!song)
         return res.status(404).json({error : "Song not found"});
         return  res.json(song);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
};