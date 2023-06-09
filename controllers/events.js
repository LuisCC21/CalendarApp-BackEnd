const express=require('express');
const Evento=require('../models/Evento');



const getEventos= async(req,res=express.response)=>{
    const eventos = await Evento.find().populate('user','name');

    res.status(200).json({
        ok:true,
        msg:eventos
    })
    

    
  

}

const crearEvento= async(req,res=express.response)=>{
   
    
    

    const evento = new Evento(req.body);
    console.log(evento)

    try {
        evento.user=req.uid;

        const eventoGuardado=await evento.save()
        console.log(eventoGuardado)

        res.status(201).json({
            ok:true,
            evento:eventoGuardado
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
    }
  

}

const actualizarEvento= async(req,res=express.response)=>{

     const eventoId = req.params.id;
     const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);
        if(!evento){
            res.status(404).json({
                ok:true,
                msg:"El evento no existe con ese id"
            })
            
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })

        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
        
        res.json({
            ok:true,
            evento:eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })

    }
 
}

const eliminarEvento= async(req,res=express.response)=>{

     const eventoId = req.params.id;
     
     const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:true,
                msg:"El evento no existe con ese id"
            })
            
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })

        }

      

        const eventoBorrado = await Evento.findByIdAndDelete(eventoId);
        
        res.json({
            ok:true,
            evento:eventoBorrado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })

    }
    
  

}

module.exports={
    eliminarEvento,
    actualizarEvento,
    getEventos,
    crearEvento
}