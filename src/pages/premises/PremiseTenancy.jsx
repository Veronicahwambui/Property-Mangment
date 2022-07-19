import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'


function PremiseTenancy() {
    const [activeTab, setActiveTab] = useState(1)
    const [paymentTransactions, setPaymentTransactions] = useState([])

    const [tenancy, setTenancy] = useState({})


    const { id } = useParams()
  
    let tenantId = id

    const fetchAll = () => {
      requestsServiceService.viewTenancy(tenantId).then((res)=>{
        setTenancy(res.data.data.tenancy)
        setPaymentTransactions(res.data.data.paymentTransactions)
      })
    }

    useEffect(() => {
        fetchAll()
    }, [])


  return (
    <div className='page-content'>
    <div className="content-fluid">
        <div class="row">
            <div class="col-12">
                {/* <!-- Left sidebar --> */}
                <div class="email-leftbar card calc-h-3px-md">
                  

                    <div class="mail-list mt-4">
                        <a onClick={() => setActiveTab(1)} className={activeTab === 1 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-home-outline me-2"></i> Client Details</a>
                        <a onClick={() => setActiveTab(2)} className={activeTab === 2 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-account-clock me-2"></i>Transactions History</a>
                        <a onClick={() => setActiveTab(3)} className={activeTab === 3 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-tools me-2"></i>Charges</a>
                    </div>
                </div>
                {/* <!-- End Left sidebar --> */}


                {/* <!-- Right Sidebar --> */}
                {activeTab === 1 && <div class="email-rightbar mb-3">

                    <div class="card">
                        <div class="card-body">
                            <div>
                                <div class="row mb-3">
                                    <div class="col-12">
                                        <div class="mt-2">
                                            <h5>Unit Details</h5>
                                        </div>
                                    </div>

                                </div>
                            </div>
                         
                        </div>
                    </div>
                    {/* <!-- card --> */}


                </div>}
                {/* <!-- end Col-9 --> */}
                {activeTab === 2 &&
                    <div className='email-rightbar mb-3'>
                        <div className="card">
                            <div className="card-body">
                            <div class="row mb-3">
                                    <div class="col-12">
                                        <div class="mt-2">
                                            <h5>Transactional Details</h5>
                                        </div>
                                    </div>

                                </div>
                                <div class="table-responsive table-responsive-md overflow-visible">
                                    <table class="table table-editable align-middle table-edits" >
                                        <thead class="table-light" >
                                            <tr class=" text-uppercase ">
                                                <th>#</th>
                                                <th>tenant name</th>
                                                <th>premise name</th>
                                                <th>unit name</th>
                                                <th>title</th>
                                                <th>description</th>
                                                <th>quantity</th>
                                              
                                                <th>applicable charge</th>
                                               <th>charge type</th>
                                               <th>bill Amount</th>
                                                <th>paid amount</th>
                                               <th>invoice date</th>
                                               <th>payment status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paymentTransactions && paymentTransactions.map((ten, index) => (
                                             <tr >
                                               <td>{index + 1 }</td>
                                               <td>{ten.transaction.tenantName}</td>
                                               <td>{ten.transaction.premiseName}</td>
                                               <td>{ten.transaction.premiseUnitName}</td>
                                               <td>{ten.transactionTitle}</td>
                                               <td>{ten.transactionDescription}</td>
                                               <td>{ten.quantity}</td>
                                           
                                               <td>{ten.applicableChargeName}</td>
                                               <td>{ten.applicableChargeType}</td>
                                               <td>{ten.billAmount}</td>
                                               <td>{ten.billPaidAmount}</td>
                                               <td>{ten.invoiceDate}</td>
                                               <td>{ten.paymentStatus}</td>
                                             </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    </div>
</div>
  )
}

export default PremiseTenancy