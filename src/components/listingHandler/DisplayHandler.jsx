import React from 'react'
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

function Storage({ data, perPage, currentPage, updateCurrentPage, pageNumbers, refinedData }) {

    const changePage = (pageNum) => updateCurrentPage(pageNum);

    return (
        <Container className="mt-5">
            {data && data.length > 0 && (
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="0"
                    onSelect={() => changePage(1)}
                >
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {data.map((cat, i) => {
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
                                                    <span>{refinedData[i].Product.length}</span>
                                                </Badge>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {data.map((list, i) => {
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
                                                                                {currentPage > 1
                                                                                    ? (i =
                                                                                        i +
                                                                                        1 +
                                                                                        perPage * currentPage -
                                                                                        perPage)
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
                                                                currentPage={currentPage}
                                                                totalSize={refinedData[i].Product.length}
                                                                changeCurrentPage={changePage}
                                                                numberOfPagesNextToActivePage={4}
                                                                theme="border-bottom"
                                                            />

                                                            <Alert variant="light">
                                                                page <strong>{currentPage}</strong> of{" "}
                                                                <strong>{pageNumbers[i].length}</strong>
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
