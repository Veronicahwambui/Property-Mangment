import moment from 'moment';
import React from 'react'
import { Modal } from "react-bootstrap";

function ViewMessage(props) {
    let messageData = props.messageData
    let modalMessage = Object.keys(messageData)?.length > 0 && JSON.parse(messageData?.data);
    return (
        <>
        { messageData.communicationType == "SMS" &&
        <Modal show={props.show} onHide={props.closeMessage} size="lg" centered>
            <Modal.Header closeButton>
                <h5 className="modal-title" id="myLargeModalLabel">
                    Message Details
                </h5>
            </Modal.Header>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div >
                            <div>
                                <div class="flex-grow-1  d-flex align-items-center justify-content-between mb-3 chat-user-box">
                                    <p class="user-title m-0 text-capitalize">{messageData?.createdBy}</p>
                                    <p class="text-muted mt-1 pb-0"> <i class="mdi mdi-phone me-1"></i> {messageData?.contact}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="font-size-14">Message</h5>
                            <p class="text-muted m-0 p-0 font-12px">{modalMessage.text} </p>
                            <p class="text-muted mt-3"> {moment(messageData.dateTimeCreated).format("dddd MMM DD YYYY")}</p>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
       }
       { messageData.communicationType == "EMAIL" &&
        <Modal show={props.show} onHide={props.closeMessage} size="lg" centered>
            <Modal.Header closeButton>
                <h5 className="modal-title" id="myLargeModalLabel">
                    Email Details
                </h5>
            </Modal.Header>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div >
                            <div>
                                <div class="flex-grow-1  d-flex justify-content-between  mb-1 chat-user-box">
                                    <p class="user-title m-0 text-capitalize"> <strong>Created by: </strong>{messageData?.createdBy}</p>
                                    <p class="text-muted  pb-0"> <strong><i class="mdi mdi-email me-1" ></i> </strong>{messageData?.contact + " "}</p>
                                </div>
                            </div>

                            <div>
                                <div class="flex-grow-1  d-flex justify-content-between mb-3 chat-user-box">
                                    <p class="user-title m-0 text-capitalize text-muted"><strong>from: </strong> {modalMessage?.from}</p>
                                    <p class="text-muted  pb-0"> <strong>To: </strong>{modalMessage?.to}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            {/* <h5 class="font-size-14">Subject :</h5> */}
                            <p class="text-mute my-2 p-0 font-12px text-uppercase">{modalMessage?.subject} </p>
                            {/* <h5 class="font-size-14 my-2">Message :</h5> */}
                            <p class="text-muted m-0 p-0 font-12px">{modalMessage?.model?.message} </p>

                            <p class="text-muted mt-3"><strong>Signature :</strong> {modalMessage?.model?.signature}</p>
                            <p class="text-muted mt-0"><strong>Name :</strong> {modalMessage?.model?.name}</p>
                            <p class="text-muted mt-2"><strong>Created on :</strong> {moment(messageData?.dateTimeCreated).format("dddd MMM DD YYYY")}</p>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
      }
        </>
    )
}

export default ViewMessage