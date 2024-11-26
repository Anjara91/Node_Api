const Curso = require("../models/curso.model");

const add = async (req, res) => {

    const newCurso = new Curso(req.body);
    const createdCurso = await newCurso.save();  //save crea en la coleccion de la bbdd un nuevo documento
    return res.json(createdCurso);
}

const updateCurso = async (req, res) =>{

    const id = req.params.id;
    const curso = req.body;

    try {
        const newCurso = await Curso.findByIdAndUpdate(id, curso, {new:true})
        return res.json(newCurso);
    } catch (error) {
        
    }

}

const deleteCurso = async (req, res)=>{
    try {
        const deleteCurso = await Curso.findByIdAndDelete(req.params.id);
        return res.json(deleteCurso);
    } catch (error) {
        
    }
}

const getByName = async (req, res)=>{    //nombre estrictamente igual
try {
    const nameCurso = req.body.name;
    const data = await Curso.find({name: nameCurso});
    return res.json(data);
} catch (error) {
    
}
}

const addUser = async (req, res)=>{
const idCurso = req.params.idC;
const idUser = req.params.idU;
const findCurso = await Curso.findById(idCurso);
if (!findCurso){
    return res.json({msg: "no existe el curso"})
}

if(findCurso.users.includes(idUser)){
    return res.json({msg: "el usuario ya existe"})
}

findCurso.users.push(idUser);
const newUser = await findCurso.save();
return res.json({msg: "modificado con exito", data: newUser});
}

const getAll = async (req, res)=>{
   try {
    
    const list = await Curso.find().populate("users");
    return res.json(list);
   } catch (error) {
    
   }
}

const updateUser = async (req, res) =>{
//esto se utiliza para mandar id, paginaciones, limites...
//query params
//req.query esto va a ser un objeto, podemos ponerlo en el apartado Query para que nos sea más facil 
    try {
        const {idc, idu} = req.query;
        const cursoUpdate = await Curso.findByIdAndUpdate(idc, {$pull:{users:idu}}, {new:true});
        return res.json(cursoUpdate);

    } catch (error) {
        
    }
}

const getAllName = async (req, res)=>{ //nombre similar, no estrictamente como está escrito
    try {
        const nameCurso = req.body.name;
        const data = await Curso.find({
            name: {$regex: nameCurso, $options: "i"} //options i es una estructura para que no discrimine entre mayusculas y minusculas
        });
        return res.json(data);
    } catch (error) {
        
    }
}

module.exports = {add, updateCurso, deleteCurso, getByName, addUser, getAll, updateUser, getAllName};