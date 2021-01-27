import { Card, Button, Row, Col } from 'react-bootstrap'
import React from 'react'
export default function AllTodos(props) {
    const { Arryin } = props;
    let statusBtnEdit = '';
    let statusBtnTrash = '';
    let statusBtnTrashNote = '';
    let statusBtnDone = '';
    let statusBtnDoneNote = '';
    let bgCardStatus = {};

    if (Arryin.todoTrash) {
        statusBtnDone = 'fa  fa-check disabled ';
        statusBtnDoneNote = 'انجام شده ';
        statusBtnEdit = 'fa fa-pencil disabled';
        statusBtnTrash = 'fa fa-refresh';
        statusBtnTrashNote = ' باز گشت ';
        bgCardStatus = { backgroundColor: "#FFB8B8" };
    }
    else {
        statusBtnDone = ' fa  fa-check ';
        statusBtnDoneNote = ' انجام شده';
        statusBtnEdit = 'fa fa-pencil ';
        statusBtnTrash = 'fa fa-trash';
        statusBtnTrashNote = ' حذف ';
        bgCardStatus = { backgroundColor: "#f4fbff" };
    }
    if (Arryin.DateGenerit === Arryin.EndDay) {
        bgCardStatus = { backgroundColor: "rgba(255, 225, 78, 0.73)" };
    }
    if (Arryin.tododone) {
        statusBtnDone = ' fa fa-arrow-right ';
        statusBtnDoneNote = ' بازگشت به در حال انجام  ';
        statusBtnEdit = 'fa fa-pencil disabled';
        statusBtnTrash = 'fa fa-trash';
        statusBtnTrashNote = ' حذف ';
        bgCardStatus = { backgroundColor: "#d2fabb" };
        
    }
    return (
        <Card className='mt-3 mb-3'>
            <Card.Body style={bgCardStatus}>
                {Arryin.todotitle}
                <Row>
                    <Col>ایجاد شده در:<br />
                        <span>{new Date(Arryin.id).toLocaleTimeString()}</span><br />
                        <span> {Arryin.DateGenerit}</span>
                    </Col>
                    <Col>
                        تاریخ پایان :
                        <p>{Arryin.EndDay}</p>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button
                            onClick={props.tododone}
                            variant='success'
                            className={statusBtnDone}>
                            <span className='btn-el'>{statusBtnDoneNote}</span></Button>
                    </Col>
                    <Col>
                        <Button
                            variant='success'
                            className={statusBtnEdit}><span className='btn-el'> ویرایش </span></Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={props.TodoTerash}
                            variant='danger'
                            className={statusBtnTrash}
                        ><span className='btn-el'>{statusBtnTrashNote}</span></Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}
