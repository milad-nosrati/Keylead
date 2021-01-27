import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import AllTodos from './AllTodos'

export default function SearchTodo(props) {
    const [Searchvalue, setSearchvalue] = useState('')

    const { itemSerch } = props

    const HandleSearch = e => setSearchvalue(e.target.value)

    const SearchMax = itemSerch ? itemSerch.slice(0, 10) : null

    let SearchInput = SearchMax.filter((item) => {
        if (item.todotitle === Searchvalue)
            return true;
        else
            return false;
    })

    return (
        <Row>
            <Col lg={12} md={12} sm={12} xs={12} className='mt-3'>
                <Form.Control
                    required
                    value={Searchvalue}
                    onChange={HandleSearch}
                    type='text'
                    placeholder='جستجو در میان کار ها'
                />

            </Col>
            <Col>
                <p className='text-center m-2'> {SearchInput.length > 0 ? SearchInput.length + ' مورد یافت شد ' : null}</p>
                {
                    SearchInput ?
                        SearchInput.map((item, index) => (
                            <AllTodos
                                key={index}
                                Arryin={item}
                            />
                        ))
                        : null
                }
            </Col>
        </Row>
    )
}
