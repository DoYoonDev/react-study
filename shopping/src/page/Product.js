import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getProducts = async () => {
    let searchQuery = query.get('q') || ""; // 쿼리 파라미터에서 검색어를 가져옴
    console.log(searchQuery);
    let url = `https://my-json-server.typicode.com/DoYoonDev/react-study/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]); // 상품 목록을 가져오는 API 호출

  return (
    <div>
      <Container>
        <Row>
           {productList.map((menu) => (
            <Col lg={3}>
                <ProductCard item={menu}/>
            </Col>
           ))}
        </Row>
      </Container>
    </div>
  );
};

export default Product;
