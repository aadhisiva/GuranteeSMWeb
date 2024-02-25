import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ITitleBar } from '../../utilities/interfacesOrtype';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../redux/actions/userAction';
import { DASHBOARD } from '../../utilities/routePaths';
import { useNavigate } from 'react-router-dom';

export default function Titlebar({ title}: ITitleBar) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handeClick = () => {
    dispatch(userLoggedOut())
  };
const handleNavigate = () => {
  navigate(DASHBOARD)
}
  return (
    <div className='border h-8 bg-emerald-300'>
    <Row className='w-full'>
      <Col md={1} sm={4} xs={4} onClick={handleNavigate} className='cursor-pointer'><p><i className="bi bi-house-fill text-blue-600 text-xl"></i></p></Col>
      <Col md={6} sm={3} xs={4}>{title}</Col>
      <Col md={5} sm={5} xs={4}className='text-end text-lg cursor-pointer'><span onClick={handeClick}>{"Logout"}</span></Col>
    </Row>
    </div>
  )
}
