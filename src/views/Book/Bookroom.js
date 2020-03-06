import React, { Component } from 'react';
import { Table, Row, ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { css } from '@emotion/core';
import RiseLoader from 'react-spinners/RiseLoader';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { selectFilter, Comparator, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

var moment = require('moment');


class Bookroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dateBook: new Date(),
            products: [{ roomId: "1", roomName: "V1", roomPrice: 100, roomStatus: true }, { roomId: "2", roomName: "V2", roomPrice: 555, roomStatus: false }, { roomId: "3", roomName: "V3", roomPrice: 999, roomStatus: false }],
        };
        this.handleDateClick = this.handleDateClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglePrimary = this.togglePrimary.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.setState({ loading: false });
    };

    togglePrimary() {
        this.setState({
            primary: !this.state.primary,
        });
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
        });
    }

    handleDateClick = (arg) => { // bind with an arrow function
        this.setState({
            primary: !this.state.primary,
            dateBook: new Date(arg.dateStr),
        });
    }



    render() {
        const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
        const columns = [{
            dataField: 'roomId',
            text: 'รหัสห้องพัก',
            headerStyle: (colum, colIndex) => {
                return { width: '120px', textAlign: 'center'};
            },
            align: 'center',
            formatter: (cellContent, row, rowIndex) => (
                <span> {rowIndex + 1} </span>)
        }, {
            dataField: 'roomName',
            text: 'ชื่อห้องพัก',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            },
        }, {
            dataField: 'roomPrice',
            text: 'ราคาห้องพัก',
            align: 'right',
            headerStyle: (colum, colIndex) => {
                return { width: '120px', textAlign: 'center' };
            },
            formatter: (cellContent, row, rowIndex) => (
                <span>{cellContent.toFixed(2)}</span>
            ),

        }, {
            dataField: 'roomStatus',
            text: 'สถานะห้องพัก',
            align: 'center',
            headerStyle: (colum, colIndex) => {
                return { width: '130px', textAlign: 'center' };
            },
            formatter: (cellContent, row, rowIndex) => {
                if(row.roomStatus){
                    return( <Button className="btn btn-warning" style={{width: '110px'}}>จองแล้ว</Button> )
                }
                else{
                    return( <Button className="btn btn-success" style={{width: '110px'}}>ว่าง</Button> )
                } 
            },
        }];

        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => {
                if (row.roomStatus) {
                    return (
                        <div>
                            <p>
                                <span style={{ color: 'black',fontWeight:'bold' }}>ชื่อผู้จอง : </span> <span>{`Wannasak Penpipatkul`}</span>
                                <span style={{ color: 'black',fontWeight:'bold' }}> เบอร์ติดต่อ : </span> <span>{`0846679111`}</span>
                            </p>
                            <p><span style={{ color: 'black',fontWeight:'bold' }}>วันที่จอง : </span> <span> {moment(this.state.dateBook).format('dddd DD/MM/YYYY')}</span></p>
                            <p><span style={{ color: 'black',fontWeight:'bold' }}>ชำระเงิน : </span> <span style={{ color: 'green'}}> {`ชำระแล้ว`}</span></p>
                            <p><span style={{ color: 'black',fontWeight:'bold' }}>รายละเอียด : </span> <span> {`รายละเอียด`}</span> <Button className="btn btn-danger pull-right">ยกเลิก</Button></p>
                        </div>
                    )
                } else {
                    // return (<> </>)
                }
            }
        };


        return (
            <div className="animated fadeIn">
                <div className="card padding">
                    <div className="card-header">
                        <h5>
                            <i className="fa fa-calendar"></i>  BookingRoom

                         </h5>
                    </div>
                    <div className="card-body">
                        <Row>
                            <RiseLoader
                                css={override}
                                sizeUnit={"px"}
                                size={15}
                                color={'#39b2d5'}
                                loading={this.state.loading}
                            />
                        </Row>

                        <Row hidden={this.state.loading === true}>
                            <FullCalendar
                                eventLimit={true}
                                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin]}
                                defaultView="dayGridMonth"
                                theme={true}
                                themeSystem='bootstrap'
                                themeName='Slate'
                                dateClick={this.handleDateClick}
                                eventClick={evt => { console.log(evt.event) }}
                                events={[
                                    { title: 'event 1', date: '2019-11-18', color: '#0fffff' },
                                    { title: 'event 2', date: '2019-11-01' },
                                    { title: 'event 2', date: '2019-10-29' },
                                    { title: 'event 2', date: '2019-10-29' },
                                    { title: 'event 2', date: '2019-10-29' },
                                    { title: 'event 2', date: '2019-10-29' },
                                    { title: 'event 2', date: '2019-10-29' },
                                    { title: 'event 2', date: '2019-10-29' },
                                ]}
                            />
                        </Row>

                        <Button hidden color="primary" onClick={this.togglePrimary} className="mr-1">Primary modal</Button>
                        <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                            className={'modal-lg ' + this.props.className}>
                            <ModalHeader toggle={this.togglePrimary}> {moment(this.state.dateBook).format('dddd DD/MM/YYYY')}</ModalHeader>
                            <ModalBody>
                                <BootstrapTable
                                    keyField='roomId'
                                    data={this.state.products}
                                    columns={columns}
                                    expandRow={expandRow}
                                />
                            </ModalBody>
                            <ModalFooter hidden={this.state.loading2 === true}>

                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookroom;





