import React, { useState, useEffect } from 'react';
import './Update.css';
import { useForm } from 'react-hook-form';
import { updateData, getBonsaiById } from '../../services/bonsaisServe';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const Update = () => {
  const [bonsai, setBonsai] = useState({}); 
  const [Url_Imagen, setUrl_Imagen] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bonsaiData = await getBonsaiById(id);
        setBonsai(bonsaiData);
        setValue('specie', bonsaiData.specie);
        setValue('abonated', bonsaiData.abonated);
        setValue('trasplanted', bonsaiData.trasplanted);
        setValue('notes', bonsaiData.notes);
        setValue('images', bonsaiData.images);
        console.log('Hola desde la peticion fetch', bonsaiData)
      } catch (error) {
        console.error('Error al obtener el bonsái:', error);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (newData) => {
    newData.images = Url_Imagen;
    console.log('Hola aquí estamos' , newData);
    try {
      await updateData(id, newData);
      console.log('Datos actualizados correctamente');
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  const changeUploadImage = async (e) => {
  const file = e.target.files[0];
  const newData = new FormData();
  newData.append("file", file);
  newData.append("upload_preset", "preset_bonsai"); 

  try {
    const response = await axios.put(
      "https://api.cloudinary.com/v1_1/dputvv9bi/image/upload",
      newData
    );
    setUrl_Imagen(response.data.secure_url);
    console.log(response.data);
  } catch (error) {
    console.error("Error al cargar la imagen a Cloudinary:", error);
  }
};
  return (
    <>
    <h1 className='title-bonsai-update'>Modificar mi bonsái</h1>
    <div  className="container-update">
      <form className='container-form-update' onSubmit={handleSubmit(onSubmit)}> 


        <div className='form-update-left' >  
          <label htmlFor="images" ><p>Cambia la imagen de tu Bonsai</p><img  src="https://res.cloudinary.com/dvko0roau/image/upload/v1708026581/add_frame_tbf87i.png" alt="imagen de un marco de fotos" /></label>
          <input id="images" type="file" style={{ color: "transparent", opacity: 0, position: "absolute" }}   onChange={changeUploadImage}/>
            <br /> 
          {Url_Imagen && (
              <div>
                <img src={Url_Imagen}  alt="Imagen de mi bonsai" style={{maxWidth:"200px"}}/>
              </div>)}
          </div>

        <div className='form-update-right'>
         
            <label htmlFor='specie'>Especie:</label>
            <input type='text' className="label-form-update" id='specie' {...register('specie', { required: 'La especie es requerida' })} /><br />
            {errors.specie && <span className='span-error'>{errors.specie.message}</span>}
            <div className='dates-input-update'>
            <label htmlFor='trasplanted'>Trasplantado:</label>
            <input type='date' className="label-form-update"  id='trasplanted' {...register('trasplanted', { required: true })} /><br />
            {errors.trasplanted && <span className='span-error'> La fecha de trasplantado es requerida </span>}

            <label htmlFor='abonated'>Abonado:</label>
            <input type='date' className="label-form-update" id='abonated' {...register('abonated', { required: true })} /><br />
            {errors.abonated && <span className='span-error'> La fecha de abonado es requerida </span>}
            </div>

            <label htmlFor='notes'>Descripción</label>
            <textarea className='label-form-notas' id='notes' {...register('notes', { required: true })} type='text' name='notes' placeholder='' />
            { errors.notes && <span className='span-error'> La casilla de notas es requerida </span>}
            
            <button className='boton-form-update' type='submit'>Enviar</button>
           
        </div> 
          

      </form>
    </div>
    </>
  );
};

export default Update;