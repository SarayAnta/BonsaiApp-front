import axios from "axios";

const url = 'http://localhost:3008/api'

//GET

export const getData = async () => {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  };

  //POST

  export const postData = async (data) =>{
  const bonsais = await axios.post(`${url}`,data)
  alert("Bonsai creado exitosamente")
  return bonsais
}
 //DELETE
  export const deleteData = async (id) =>{
    if(confirm("¿Estás seguro que quieres eliminar este bonsai?") === true){
      const bonsais = await axios.delete(`${url}/${id}`)
    return bonsais; }
  }
  //UPDATE
   export const updateData = async (id, newData) => {
    console.log("modificando");
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const data = await response.json();
    return data;
  };

 
//Get by id
  export const getBonsaiById = async (id) => {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
};
