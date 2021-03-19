import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Tab,
    Nav,
    Table,
    Badge,
    Alert,
    Container,
} from "react-bootstrap";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import { useDispatch, useSelector } from "react-redux";
import FetchHandler from '../parserHandler/FetchDataHandler';
import CurrentListHandler from './CurrentListHandler';
import Loader from '../parserHandler/Loader';

const Storage = () => {
    const [oldPage, setOldPage] = useState(null);

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const changePage = (pageNum) => {
        setOldPage(state.data.currentPage);
        dispatch({
            type: "GET_CURRENT_PAGE",
            payload: pageNum
        });

    }

    useEffect(() => {
        dispatch({
            type: "LOADING_STARTS"
        });
        if (state.data.currentList.length > 0) {
            dispatch({
                type: "LOADING_DONE"
            });
        }
    }, [dispatch, state.data.currentList.length])

    return (
        <Container className="mt-5">
            {state.status.isLoading && (
                <>
                    <Loader />
                    <FetchHandler />
                </>
            )}
            {!state.status.isLoading && state.status.error && (
                <>
                    <h1>Some problems while getting data!!!</h1>
                    {console.log(state.status.error)}
                </>
            )}
            {state.data.currentPage !== oldPage && (
                console.log(oldPage),
                <CurrentListHandler />
            )}

            {state.data.currentList && state.data.currentList.length > 0 && (
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="0"
                    onSelect={() => changePage(1)}
                >
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {state.data.currentList.map((cat, i) => {
                                    return (
                                        <Nav.Item key={i}>
                                            <Nav.Link
                                                eventKey={i}
                                                className="d-flex justify-content-between px-3"
                                            >
                                                <small>
                                                    <b>{cat.Category.toUpperCase()}</b>
                                                </small>
                                                <Badge variant="light">
                                                    <span>{state.data.finalOutput[i].Product.length}</span>
                                                </Badge>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {state.data.currentList.map((list, i) => {
                                    return (
                                        <Tab.Pane key={i} eventKey={i}>
                                            {
                                                list.Product.length > 0 && (
                                                    <>
                                                        <Table responsive="sm" size="sm" striped bordered>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Name</th>
                                                                    <th>Price</th>
                                                                    <th>Color</th>
                                                                    <th>Manufacturer</th>
                                                                    <th>Availability</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {list.Product.map((s, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>
                                                                                {state.data.currentPage > 1
                                                                                    ? (i =
                                                                                        i +
                                                                                        1 +
                                                                                        state.data.perPage * state.data.currentPage -
                                                                                        state.data.perPage)
                                                                                    : (i = i + 1)}
                                                                            </td>
                                                                            <td>{s.name}</td>
                                                                            <td>{s.price}</td>
                                                                            <td><ol>{s.color.map((value, i) => {
                                                                                return (
                                                                                    <li key={i}>{value}</li>
                                                                                )
                                                                            })}</ol></td>
                                                                            <td>{s.manufacturer}</td>
                                                                            <td>{s.availability}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                        <div className="d-flex justify-content-between">

                                                            <Pagination
                                                                currentPage={state.data.currentPage}
                                                                totalSize={state.data.finalOutput[i].Product.length}
                                                                changeCurrentPage={changePage}
                                                                numberOfPagesNextToActivePage={4}
                                                                theme="border-bottom"
                                                            />

                                                            <Alert variant="light">
                                                                page <strong>{state.data.currentPage}</strong> of{" "}
                                                                <strong>{state.data.pageNumbers[i].length}</strong>
                                                            </Alert>
                                                        </div>

                                                    </>
                                                )}
                                            {
                                                list.Product.length < 1 && (
                                                    <p className="text-center">
                                                        <strong>No product</strong>
                                                    </p>
                                                )}
                                        </Tab.Pane>
                                    );
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            )}
        </Container>
    )
}

export default Storage
