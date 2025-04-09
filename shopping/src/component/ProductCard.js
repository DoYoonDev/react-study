import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = (item) => {
  const navigate = useNavigate()
  const showDetail = () => {
    navigate(`/product/${item.item.id}`);
  }
  return (
    <div className='card' onClick={showDetail}>
        <img width="100%" src={item.item?.img} />
        <div>{item.item?.choice === true ? "Concious Choice" : ""}</div>
        <div>{item.item?.title}</div>
        <div>{item.item?.price}</div>
        <div>{item.item?.new === true ? "신제품" : ""}</div>
    </div>
  )
}

export default ProductCard
