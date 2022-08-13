/* global $*/
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";

function Messages() {

    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(0);
    const [type, setType] = useState("TENANT");
    const [perPage, setPerPage] = useState(10);
    const [pageData, setPageData] = useState([])
    const [messageData, setMessageData] = useState({})
    const [loading, setLoading]= useState(true)



    const handlePageClick = (data) => {
        setPage(() => data.selected);
    };

    useEffect(() => {
        setLoading(!false)

        requestsServiceService.getSMS(page, perPage, type, authService.getClientId()).then((res) => {
            setPage(res.data.page)
            setPerPage(res.data.size)
            setPageCount(res.data.totalPages)
            setPageData(res.data.data)
            window.scrollTo(0, 0);
            setLoading(false)

        }).catch((err)=>{
            setLoading(false)
        })
    }, [page, perPage, type]);


 let modalMessage = Object.keys(messageData)?.length > 0 && JSON.parse(messageData?.data).text;
    return (
        <div className="page-content">
            <div className="container-fluid">

                {/* <!-- start page title --> */}
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0 font-size-18">All Messages</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li class="breadcrumb-item active">Messages</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>

                {/* */}
                <div className="row">
                    <div className="col-12">

                        <div className="mb-3">

                            <select className="btn btn-md btn-primary" title="Select A range" onChange={(e) => setPerPage(e.target.value)}>
                                <option className="bs-title-option" value="">Select A range</option>
                                <option value="5">10 Rows</option>
                                <option value="30">30 Rows</option>
                                <option value="50">50 Rows</option>
                                <option value="150">150 Rows</option>
                            </select>

                            <select className=" m-3 btn btn-md btn-primary" title="Select A range" onChange={(e) => setType(e.target.value)}>
                                <option value="TENANT">Tenant</option>
                                <option value="TENANCY">Tenancy </option>
                                <option value="LANDLORD">Landlord </option>
                                <option value="USER">User </option>
                            </select>

                        </div>
                        {/* table  */}
                        <div className="card-body the-inbox">
                        {loading && 
                             <div className="d-flex justify-content-center align-items-center">
                                <div className="loading loader2"></div>
                                </div>
                            }
                            {pageData?.length === 0 && !loading &&
                                <div className="d-flex justify-content-center align-items-center">
                                    <h4 className="text-muted">No Messages Found</h4>
                                </div>
                            }
                            {pageData?.length > 0 &&   <table id="emailDataTable-btns" class="table nowrap w-100 table-hover mt-0 mb-0">
                                <thead></thead>
                                <tbody className="table-hover">
                                    {pageData?.map((mes , index) =>{
                                        let message = JSON.parse(mes.data) 
                                        return (
                                        <tr key={mes.id} onClick={()=> setMessageData(pageData[index] )} class="text-nowrap" data-toggle="modal" data-target="#messageDetails">

                                            <td>
                                                <span class=" font-size-18 d-md-flex">
                                                    <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">SMS</span></i>
                                                    {/* <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">email</span></i> */}
                                                </span>
                                            </td>
                                            <td class="text-capitalize d-md-table-cell">{mes.createdBy}</td>
                                            <td class="the-msg the-msg-2">
                                             <span>{message.text}</span>  
                                            </td>                                                

                                            <td class="text-capitalize d-md-table-cell">{moment(mes.dateTimeCreated).format("ddd MMM DD")}</td>
                                        </tr>
                                    )})}

                                </tbody>
                            </table>}
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="font-medium  text-muted mt-2">
                                    showing page <span className="text-primary">{ pageCount === 0 ? page:page + 1}</span> of<span className="text-primary"> {pageCount}</span>{" "} pages
                                </h5>

                                {pageCount !== 0 && pageCount > 1 && (
                                    <nav aria-label="Page navigation comments" className="mt-4">
                                        <ReactPaginate
                                            previousLabel="<"
                                            nextLabel=">"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            pageCount={pageCount}
                                            pageRangeDisplayed={4}
                                            marginPagesDisplayed={2}
                                            containerClassName="pagination justify-content-center"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            activeClassName="active"
                                            onPageChange={() => handlePageClick}
                                            hrefBuilder={(page, pageCount, selected) =>
                                                page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                                            }
                                            hrefAllControls
                                        />
                                    </nav>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- message details modal --> */}
                <div class="modal fade" id="messageDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content border-radius-0">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Message Details</h5>
                                <span class="close font-28 cursor-pointer" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </span>
                            </div>
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
                                            <p class="text-muted m-0 p-0 font-12px">{ modalMessage} </p>
                                            <p class="text-muted mt-3"> {moment(messageData.dateTimeCreated).format("dddd MMM DD YYYY")}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Messages