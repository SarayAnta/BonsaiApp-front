import React from 'react'
import Delete from '../Delete'
import Modal from '../modal/Modal'
import './Card.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Card = ({bonsais}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
   <>
   {
      bonsais.map(bonsai =>{
        return(
      <div key={bonsai.id} /* bonsai={bonsai} */ className='card-bonsai-container'>
      
        <div className= 'card-bonsai-container' >
          <div className='card-container-img'>
              <img className='image-bonsai' src={bonsai.images} alt="La imagen del bonsai que sube el usuario" ></img>
          </div>
          <div className='green-box'>
          <div className='box-card'>
            <h3 className='title-card-box' >{bonsai.specie}</h3>
            <div className='card-text' >
                <p>Trasplantado</p>
                <p>Abonado</p>  
            </div>
        
            <div className='dates-card-input' >
              <div  className='date-text' >
                <img className='icon-trasplantado' src='../src/assets/logo-trasplantar.svg' alt='icono trasplantado' />
                <p>{bonsai.trasplanted}</p>
              </div>
              <div className='date-text' >
                      <img className='icon-abonado' src='../src/assets/logo-abonado.svg' alt='icono abonado' />
                <p>{bonsai.abonated}</p>
              </div>
            </div>
            <div className='card-buttons' style={{display: "flex", marginTop:"20px", marginBottom:"40px", gap:"10px"}}>
              <button className='buttons-card-detail' onClick={()=> setIsModalOpen(true)}>Descripción</button>
              <button className='buttons-card-modified'  type="button" onClick = {()=>navigate(`/update/${bonsai.id}`)}>Modificar</button>
              <Delete  id={bonsai.id}/>
            </div>
              <Modal isOpen = {isModalOpen} closeModal={()=> setIsModalOpen(false)} notas={bonsai.notes}/>
                </div>
            </div>
          </div>
          

      </div>  
    
    
    )
  })
  }
   
   </> 
  )
}



export default Card