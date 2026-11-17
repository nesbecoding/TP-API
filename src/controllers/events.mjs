import UserModel from '../models/event.mjs';
let data=[];

const Events = class Events {
  constructor(app) {
    this.app = app;

    this.run();
  }

  getAll(){
    try{
        this.app.get('/Events/',(req,res)=>{
          res.status(200).json(data);  
        });
    }

    catch(error) {
        res.status(500).json({
            code:500,
            message: 'Internal Servor Error',
            error
        });
    }
}

getShowByid(){
    try{
        this.app.get('/Events/:id',(req,res)=>{
            const id=req.params.id;
            const event= data.filter((event)=> event.id===id);

          res.status(200).json(event);  
        });
    }

    catch(error) {
        res.status(500).json({
            code:500,
            message: 'Internal Servor Error',
            error
        });
    }


}

deleteByid(){
    try{
        this.app.delete('/Events/:id',(req,res)=>{
            const id=req.params.id;
            const userId=req.body.userId;
            const event= data.find((event)=> event.id===id);

            if (!event){
                res.status(404).json({
                    error: 404,
                    message: 'Couldnt find user by id'
                });
            }

            if (!event.org.includes(userId)){
                return res.status(403).json({
                    error: 403,
                    message:' ure not authorized to delete an event'
                });
            }
            
            data=data.filter((event)=> event.id!==id); 

            res.status(200).json({
                code:200,
                message:'event deleted successfully'
            });
            

            
        });
    }

    catch(error) {
        res.status(500).json({
            code:500,
            message: 'Internal Servor Error',
            error
        });
    }

}

addByid(){
    try{
        this.app.post('/Events/',(req,res)=>{
            const {id,nom,description,dateDebut,dateFin,
                lieu,photoCouverture,visibilite,org,members
            }= req.body;

            const newEvent={id,nom,description,dateDebut,dateFin,
                lieu,photoCouverture,visibilite,org,members
            }

            data.push(newEvent);
        
        });

            
            
    }
    catch(error){
        res.status(500).json({
            error : 500,
            message: 'Internal Servor Error'
        });
    }
}

updateByid(){
    try{
        this.app.patch('/Events/:id',(req,res)=>{

            const id=req.params.id;
            const userId=req.body.userId;
            const event= data.find((event)=> event.id===id);

            if (!event){
                res.status(404).json({
                    error: 404,
                    message: 'Couldnt find user by id'
                });
            }

            if (!event.org.includes(userId)){
                res.status(403).json({
                    code:403,
                    message:'ure not allowed to update this event'
                })
            }
            
            const body=req.body;

            Object.assign(event,body);

            res.status(200).json(event);
            
            });
    }
    catch(error){
        res.status(500).json({
            error : 500,
            message: 'Internal Servor Error'
        });
    }
}

  run() {
    this.getAll();
    this.getShowByid();
    this.deleteByid();
    this.addByid();
    this.updateByid();
  }
};

export default Events;
