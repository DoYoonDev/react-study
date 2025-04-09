import React from 'react'

const ProductCard = (item) => {
  return (
    <div>
        <img width="100%" src={item.item?.img} />
        <div>{item.item?.choice == true ? "Concious Choice" : ""}</div>
        <div>{item.item?.title}</div>
        <div>{item.item?.price}</div>
        <div>{item.item?.new == true ? "신제품" : ""}</div>
    </div>
  )
}

export default ProductCard
