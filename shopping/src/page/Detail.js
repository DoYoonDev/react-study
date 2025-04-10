import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Detail = () => {
  let {id} = useParams(); // URL 파라미터에서 id 추출
  const [product, setProuct] = useState(null); // 상품 상세 정보 상태 관리
  const getDetail = async () => {
    let url = `https://my-json-server.typicode.com/DoYoonDev/react-study/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProuct(data); // 상품 상세 정보 설정
  }
  // 상품 목록을 가져오는 API 호출
  useEffect( () => {
    getDetail();
  });
  return (
    <Container>
      <Row>
        <Col className='product-img'>
          <img src={product?.img} width="100%"/>
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div>{product?.price}</div>
          <div>{product?.new === true ? "신상품" : ""}</div>
          <div>{product?.choice === true ? "Concious Choice" : ""}</div>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">S</option>
            <option value="2">M</option>
            <option value="3">L</option>
          </Form.Select>
          <div className="d-grid gap-2">
            <Button variant="outline-secondary" size='lg'>장바구니 담기</Button>
            <Button variant="outline-secondary" size='lg'>바로구매</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail
