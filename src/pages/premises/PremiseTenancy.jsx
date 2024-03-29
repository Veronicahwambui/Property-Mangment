/* global $ */
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useTabs from '../../hooks/useTabs'
import requestsServiceService from '../../services/requestsService.service'
import AuthService from "../../services/auth.service";
import ViewMessage from '../../components/ViewMessage'

const docArr = []

function PremiseTenancy() {
    const [activeLink, setActiveLink] = useTabs()
    const [paymentTransactions, setPaymentTransactions] = useState([])
    const [charges, setCharges] = useState([])
    const [defaultCharges, setDefaultCharges] = useState([])
    const [value, setValue] = useState('')
    const [invoiceDay, setInvoiceDay] = useState('')
    const [tenancy, setTenancy] = useState({})
    const [error, setError] = useState({
        message: "",
        color: ""
    });




    const { id } = useParams()

    let tenantId = id

    const fetchAll = () => {
        requestsServiceService.viewTenancy(tenantId).then((res) => {
            setTenancy(res.data.data.tenancy)
            setPaymentTransactions(res.data.data.paymentTransactions)
            setCharges(res.data.data.tenancyCharges)
            setIssues(res.data.data.issues)
            setDefaultCharges(res.data.data.defaultPremiseUnitTypeCharges)

        })
    }

    useEffect(() => {
        fetchAll()
        getIssueTypes()
        fetchCommunication()
        requestsServiceService.getDocumentTypes().then((res) => {
            setdocumentTypes(res.data.data);
        })

    }, [])

    const [chargeConstraintName, setChargeConstraintName] = useState('')
    const [constraintChargeId, setConstraintChargeId] = useState('')
    const [constraintTypeChargeId, setConstraintTypeChargeId] = useState('')
    const [rateCharge, setRateCharge] = useState('')
    // const [chargeConstraintName ,setChargeConstraintName]=useState('')


    const handleChargeChange = (e) => {
        let stat = e.target.value.split(":")
        setChargeConstraintName(stat[0])
        setRateCharge(stat[1])
        setConstraintChargeId(stat[2])
        setConstraintTypeChargeId(stat[3])
    }


    const create = () => {

        let data = JSON.stringify({
            active: true,
            chargeConstraintName: chargeConstraintName,
            constraintChargeId: constraintChargeId,
            invoiceDay: invoiceDay,
            premiseUnitTypeChargeId: constraintTypeChargeId,
            rateCharge: rateCharge,
            tenancyId: tenantId,
            unitCost: '',
            value: value
        })

        requestsServiceService.createTenancyCharges(tenantId, data).then((res) => {
            fetchAll()
            $("#create-tenant-charge").modal("hide");

            if (res.data?.status) {
                setError({
                    ...error,
                    message: res.data.message,
                    color: "success"
                })
            } else {

                setError({
                    ...error,
                    message: res.data.message,
                    color: "warning"
                })
            }

            setTimeout(() => {
                clear()
            }, 3000)

        }).catch((res) => {
            $("#create-tenant-charge").modal("hide");

            setError({
                ...error,
                message: res.data.message,
                color: "danger"
            })

        })
    }

    const clear = () => {
        setError({
            ...error,
            message: "",
            color: ""
        });
    }
    // TENANCY ISSUES
    const [issueDetails, setIssueDetails] = useState({
        description: '',
        issueTypeId: '',
    })
    const [issueTypes, setIssueTypes] = useState([])
    const [issues, setIssues] = useState([])
    const [docName, setdocName] = useState("")
    const [document, setdocument] = useState("")
    const [adddocument, setadddocument] = useState(false)
    const [documentTypes, setdocumentTypes] = useState([])
    const [documentTypeId, setdocumentTypeId] = useState(null)
    // const [docArr, setDocArr] = useState([])
    const [chargeable, setChargable] = useState(false)
    const [applicableCharge, setApplicableCharge] = useState(null)
    const [unitCost, setUnitCost] = useState('')
    const [tenacyIssueId, setTenacyIssueId] = useState(null)



    const handleIssues = (e) => {
        setIssueDetails({
            ...issueDetails, [e.target.name]: e.target.value
        })
    }

    const getIssueTypes = () => {
        requestsServiceService.findAllTenancyIssueTypes().then((res) => {
            setIssueTypes(res.data.data)
        })
    }

    const submitIssue = (e) => {
        e.preventDefault()

        let data = JSON.stringify({
            comments: issueDetails.description,
            description: issueDetails.description,
            id: null,
            tenancyId: tenantId,
            tenancyIssueTypeId: issueDetails.issueTypeId
        })

        requestsServiceService.createTenancyIssue(data).then((res) => {
            fetchAll()
            $(".issue-modal").modal("hide");
            setIssueDetails({
                description: '',
                issueTypeId: null,
            })

            if (res.data?.status) {
                setError({
                    ...error,
                    message: res.data.message,
                    color: "success"
                })
            } else {

                setError({
                    ...error,
                    message: res.data.message,
                    color: "warning"
                })
            }

            setTimeout(() => {
                clear()
            }, 3000)

            setActiveLink(4)



        }).catch((res) => {
            $(".issue-modal").modal("hide");

            setIssueDetails({
                description: '',
                issueTypeId: null,
            })
            setError({
                ...error,
                message: res.data.message,
                color: "danger"
            })

            setTimeout(() => {
                clear()
            }, 3000)
        })


    }


    const addDoc = (e) => {
        e.preventDefault()

        docArr.push({
            docName: docName,
            document: document,
            documentOwnerTypeName: "TENANT",
            documentTypeId: documentTypeId,
            id: null,
            ownerEntityId: tenantId
        })


        setdocName(null)
        setdocument(null)
        setdocumentTypeId(null)
        setadddocument(false)
    }
    const removeDoc = (index) => {
        if (index > -1) {
            docArr.splice(index, 1);
        }
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setdocument(base64);

    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleNextSatatus = (chargeable, applicableCharge, tenacyIssueId, newStat) => {
        setChargable(chargeable)
        setApplicableCharge(applicableCharge)
        setTenacyIssueId(tenacyIssueId)
        setNewStatus(newStat)

        // if ( newStat?.length === 1 ) {
        //     setNewStatusAction( newStat[0]?.stateAction )
        //     setNewStatusSelected(newStat[0]?.status)   
        // }
    }

    const [newStatus, setNewStatus] = useState([])
    console.log(newStatus);

    const [newStatusSelected, setNewStatusSelected] = useState('')
    const [newStatusAction, setNewStatusAction] = useState('')
    const moveToNextStep = (e) => {
        e.preventDefault()
        let date = new Date()

        let data = JSON.stringify({
            applicableChargeId: applicableCharge?.id,
            description: issueDetails.description,
            documents: docArr,
            invoiceDate: date,
            newStatus: newStatusSelected,
            unitCost: unitCost,
            action: newStatusAction,
            tenancyIssueId: tenacyIssueId,
        })

        requestsServiceService.moveTenancyIssueToNextState(tenacyIssueId, data).then((res) => {
            fetchAll()
            setIssueDetails({
                description: '',
                issueTypeId: null,
            })
            setNewStatusSelected('')
            setNewStatusAction(' ')
            setUnitCost(null)

            $(".update-issues").modal("hide");
            if (res.data?.status) {
                setError({
                    ...error,
                    message: res.data.message,
                    color: "success"
                })
            } else {

                setError({
                    ...error,
                    message: res.data.message,
                    color: "warning"
                })
            }

            setTimeout(() => {
                clear()
            }, 3000)

        }).catch((res) => {
            $(".update-issues").modal("hide");
            setIssueDetails({
                description: '',
                issueTypeId: null,
            })

            setError({
                ...error,
                message: res.data.message,
                color: "danger"
            })

            setTimeout(() => {
                clear()
            }, 3000)
        })
    }
    //communication

    const [communication, setCommunication] = useState([])
    const [messageData, setMessageData] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const closeMessage = () => setShowMessage(false)

    let clientId = AuthService.getClientId()

    const fetchCommunication = () => {

        requestsServiceService.getEntityCommunication(tenantId, 0, 5, "TENANCY", clientId).then((res) => {
            setCommunication(res.data.data)

        })

    }

    const handleStatusAction = (e) => {
        setNewStatusAction(e.target.value)
    }

    // LOADER ANIMATION
    useEffect(() => {
        $("#spinner").removeClass("d-none");
        setTimeout(() => {
            $("#spinner").addClass("d-none");
        }, 1000);
    }, [])

    return (
        <div>
            <div className='page-content'>
                <div className="content-fluid">
                    <div class="row">
                        {/* <!-- Loader --> */}
                        <div id="spinner">
                            <div id="status">
                                <div class="spinner-chase">
                                    <div class="chase-dot"></div>
                                    <div class="chase-dot"></div>
                                    <div class="chase-dot"></div>
                                    <div class="chase-dot"></div>
                                    <div class="chase-dot"></div>
                                    <div class="chase-dot"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            {/* <!-- Left sidebar --> */}
                            <div class="email-leftbar card calc-h-3px-md">
                                <button type="button" class="btn btn-danger btn-block waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".issue-modal" >
                                    Report An Issue
                                </button>
                                <div class="mail-list mt-4">
                                    <a onClick={() => setActiveLink(1)} className={activeLink === 1 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-home-outline me-2"></i> Client Details</a>
                                    <a onClick={() => setActiveLink(2)} className={activeLink === 2 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-account-clock me-2"></i>Transactions History</a>
                                    <a onClick={() => setActiveLink(3)} className={activeLink === 3 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-tools me-2"></i>Charges</a>
                                    <a onClick={() => setActiveLink(4)} className={activeLink === 4 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-bug me-2"></i>Issues</a>
                                    <a onClick={() => setActiveLink(5)} className={activeLink === 5 ? "active cursor-pointer" : 'cursor-pointer'}> <i class="bx bx-chat"></i>Communication</a>

                                </div>

                            </div>
                            {/* <!-- End Left sidebar --> */}


                            {/* <!-- Right Sidebar --> */}
                            {activeLink === 1 && <div class="email-rightbar mb-3">

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


                                        <div class="row">
                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="mdi mdi-home-currency-usd font-size-24 text-success"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Name</a></h5>
                                                                    <p class="text-muted text-truncate mb-0 text-capitalize">{Object.keys(tenancy).length > 0 && tenancy.tenant.firstName} {Object.keys(tenancy).length > 0 && tenancy.tenant.lastName}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* <!-- end col --> */}


                                            {/* <!-- end col --> */}
                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="mdi mdi-floor-plan font-size-24 text-secondary"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">tenant type</a></h5>
                                                                    <p class="text-muted text-truncate text-capitalize mb-0">{Object.keys(tenancy).length > 0 && tenancy.tenant.tenantType?.toLowerCase()?.replace(/_/g, " ")}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* <!-- end col --> */}
                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="mdi mdi-home-variant font-size-24 text-secondary"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Gender</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">{Object.keys(tenancy).length > 0 && tenancy.tenant.gender}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* <!-- end col --> */}
                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="mdi mdi-home-variant font-size-24 text-secondary"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Nationality</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">{Object.keys(tenancy).length > 0 && tenancy.tenant.nationality}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* <!-- end col --> */}

                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="bx bx-expand font-size-24 text-black"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Phone Number</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">{Object.keys(tenancy).length > 0 && tenancy.tenant.phoneNumber} </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* <!-- end col --> */}

                                            <div class="col-xl-4 col-sm-6">
                                                <div class="card shadow-none border">
                                                    <div class="card-body p-3">
                                                        <div class="">

                                                            <div class="avatar-xs me-3 mb-3">
                                                                <div class="avatar-title bg-transparent rounded">
                                                                    <i class="bx bx-expand font-size-24 text-black"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Email</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">{Object.keys(tenancy).length > 0 && tenancy.tenant.email} </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* <!-- end col --> */}


                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card --> */}


                            </div>}
                            {/* <!-- end Col-9 --> */}
                            {activeLink === 2 &&
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
                                            <div class="table-responsive">
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
                                                                <td>{index + 1}</td>
                                                                <td className="text-capitalize">{ten.transaction.tenantName}</td>
                                                                <td className="text-capitalize">{ten.transaction.premiseName}</td>
                                                                <td className="text-capitalize">{ten.transaction.premiseUnitName}</td>
                                                                <td className="text-capitalize">{ten.transactionTitle?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                                <td className="text-capitalize">{ten.transactionDescription}</td>
                                                                <td className="text-capitalize">{ten.quantity}</td>
                                                                <td className="text-capitalize">{ten.applicableChargeName}</td>
                                                                <td className="text-capitalize">{ten.applicableChargeType?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                                <td className="text-capitalize">KSH {ten.billAmount}</td>
                                                                <td className="text-capitalize">{ten.billPaidAmount}</td>
                                                                <td className="text-capitalize">{ten.invoiceDate && moment(ten.invoiceDate).format("MMM DD YYYY")}</td>
                                                                <td className="text-capitalize">{ten.paymentStatus?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {activeLink === 3 &&
                                <div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    {error.color !== "" &&
                                                        <div className={"alert alert-" + error.color} role="alert">
                                                            {error.message}
                                                        </div>
                                                    }
                                                    <div className="d-flex justify-content-between">
                                                        <h4 class="card-title text-capitalize mb-3">Charges  </h4>
                                                        <button
                                                            type="button"
                                                            onClick={() => { setValue(''); setInvoiceDay('') }}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#create-tenant-charge"
                                                            className="btn btn-primary dropdown-toggle option-selector mb-3 mt-0"
                                                        >
                                                            <i className="dripicons-plus font-size-16"></i>{" "}
                                                            <span className="pl-1 d-md-inline">
                                                                New Charge
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <div class="table-responsive table-responsive-md overflow-visible">
                                                        <table class="table table-editable align-middle table-edits" >
                                                            <thead class="table-light" >
                                                                <tr class=" text-uppercase ">
                                                                    <th>#</th>
                                                                    <th class="">UNit type</th>
                                                                    <th>invoice day</th>
                                                                    <th>default amount</th>
                                                                    <th>amount </th>
                                                                    <th>status</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {charges && charges.map((charge, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{charge.premiseUnitTypeCharge.unitType.name}</td>

                                                                            <td>{charge.invoiceDay}</td>
                                                                            <td>{charge.premiseUnitTypeCharge.value}</td>
                                                                            <td>{charge.value}</td>
                                                                            <td> {charge.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>

                                                                        </tr>
                                                                    )
                                                                })}
                                                                <tr>

                                                                </tr>
                                                            </tbody>

                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}
                                    </div>
                                    {/* edit modal  */}
                                    <div
                                        class="modal fade"
                                        id="create-tenant-charge"
                                        data-bs-backdrop="static"
                                        data-bs-keyboard="false"
                                        role="dialog"
                                        aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true"
                                    >
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <form onSubmit={(e) => { e.preventDefault(); create() }}>

                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">
                                                            New Charge
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            class="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className="form-group">
                                                            <label htmlFor=""> applicable charge </label>
                                                            <select name="" id="" className='form-control' onChange={(e) => handleChargeChange(e)}>
                                                                <option value={null}>select applicable charge</option>
                                                                {defaultCharges && defaultCharges.map((charge) => {
                                                                    return (
                                                                        <option value={charge.chargeConstraint + ":" + charge.rateCharge + ":" + charge.constraintChargeId + ":" + charge.id}>{charge.unitType.name} - KSH {charge.value}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label htmlFor="">Invoice day (1-31) </label>
                                                            <input required type="number" max="31" min="1" placeholder="Enter invoice day" value={invoiceDay} className="form-control" onChange={(event) => setInvoiceDay(event.target.value)} />
                                                        </div>

                                                        <div className="form-group mb-2">
                                                            <label htmlFor="">value </label>
                                                            <input required type="number" placeholder="Enter value" value={value} className="form-control" onChange={(event) => setValue(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            class="btn btn-light"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            class="btn btn-primary"
                                                        >
                                                            add charge
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {activeLink === 4 &&
                                <div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    {error.color !== "" &&
                                                        <div className={"alert alert-" + error.color} role="alert">
                                                            {error.message}
                                                        </div>
                                                    }
                                                    <div className="d-flex justify-content-between">
                                                        <h4 class="card-title text-capitalize mb-3">Tenacy Issues </h4>

                                                    </div>

                                                    <div class="table-responsive table-responsive-md overflow-visibl">
                                                        <table class="table table-editable align-middle table-edits" >
                                                            <thead class="table-light" >
                                                                <tr class=" text-uppercase ">
                                                                    <th>#</th>
                                                                    <th class="">created by</th>
                                                                    <th>date created</th>
                                                                    <th>description</th>
                                                                    <th>type </th>
                                                                    <th>status</th>
                                                                    <th>end Date</th>
                                                                    <th>next state</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {issues && issues?.map((issue, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td className="text-capitalize">{issue.issue.createdBy}</td>
                                                                            <td className="">{moment(issue.issue.dateTimeCreated).format("MMM Do YY [at] h:mm a")}</td>
                                                                            <td className="text-capitalize">{issue.issue.description}</td>
                                                                            <td className="text-capitalize">{issue.issue.tenancyIssueType.name}</td>
                                                                            <td className="text-capitalize">{issue.issue?.status?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                                            <td className="">{issue.issue.endDate && moment(issue.issue.endDate).format("MMM Do YY [at] h:mm a")}</td>
                                                                            <td className=''> {issue.nextState?.status && <button className="btn btn-sm btn-primary" data-bs-toggle="modal"
                                                                                disabled>
                                                                                {issue.nextState?.status?.toLowerCase()?.replace(/_/g, " ")}
                                                                            </button>}</td>
                                                                            <td>
                                                                                <td className='text-nowrap'>{issue.nextState?.length >= 1 && issue.issue.endDate === null && <button onClick={() => handleNextSatatus(issue.nextState.chargeable, issue.nextState.applicableCharge, issue.issue.id, issue.nextState)} className="btn btn-sm btn-warning" data-bs-toggle="modal"
                                                                                    data-bs-target=".update-issues">
                                                                                    next status
                                                                                </button>}</td>
                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                })}
                                                                <tr>

                                                                </tr>
                                                            </tbody>

                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}
                                    </div>
                                    {/* edit modal  */}
                                    <div class="modal fade update-issues pb-5" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-md modal-dialog-centered mb-5">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Update issue to <span className='text-capitalize text-success'>{newStatusSelected?.toLowerCase()?.replace(/_/g, " ")}</span> </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <form onSubmit={(e) => moveToNextStep(e)}>
                                                    <div className="modal-body">
                                                        <div class="row mb-3">
                                                            <label for=" " class=" ">
                                                                Next Status Action : {" "}
                                                                <strong class="text-danger ">*</strong>
                                                            </label>
                                                            <div class="d-flex ">
                                                                {newStatus.length > 1 | newStatus.length === 1 && <div class="form-check me-3">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="radio"
                                                                        onChange={e => { handleStatusAction(e); setNewStatusSelected(newStatus[0]?.status) }}
                                                                        name="gender"
                                                                        value={newStatus[0]?.stateAction}
                                                                        checked={newStatusAction == newStatus[0]?.stateAction ? true : false}
                                                                        required
                                                                    />
                                                                    <label
                                                                        class="form-check-label"
                                                                        for="caretaker-male"
                                                                    >
                                                                        {newStatus[0]?.stateAction}
                                                                    </label>
                                                                </div>}

                                                                {newStatus?.length > 1 &&
                                                                    <div class="form-check me-3">
                                                                        <input
                                                                            onChange={e => { setNewStatusAction(e.target.value); setNewStatusSelected(newStatus[1]?.status) }}
                                                                            class="form-check-input"
                                                                            type="radio"
                                                                            name="gender"
                                                                            value={newStatus[1]?.stateAction}
                                                                            required
                                                                        />
                                                                        <label
                                                                            class="form-check-label"
                                                                            for="caretaker-female"
                                                                        >
                                                                            {newStatus[1]?.stateAction}
                                                                        </label>
                                                                    </div>}
                                                            </div>
                                                        </div>
                                                        <div class="col-12">

                                                            <div class="mb-4 ">
                                                                <label for="basicpill-firstname-input ">Issue description <strong class="text-danger ">*</strong></label>
                                                                <textarea required name="description" class="form-control " placeholder="Enter details on the issue" id="" cols="30" rows="5" onChange={(e) => handleIssues(e)} value={issueDetails.description} ></textarea>
                                                            </div>
                                                        </div>
                                                        {chargeable &&
                                                            <div className="col-12 mb-3">
                                                                <span className="text-danger">This state is Chargable </span>
                                                                <div className="form-group mt-2">
                                                                    <label htmlFor=""> Issue cost <strong className="text-danger">*</strong></label>
                                                                    <input required type="text" className="form-control" placeholder='Enter expected cost' value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        }
                                                        {/* docs table */}
                                                        {docArr?.length > 0 &&
                                                            <div class="table-responsive table-responsive-md overflow-visible">
                                                                <table class="table table-editable align-middle table-edits" >
                                                                    <thead class="table-light" >
                                                                        <tr class=" text-uppercase ">
                                                                            <th>#</th>
                                                                            <th class="">doc name</th>
                                                                            <th>actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {docArr && docArr?.map((doc, index) => {
                                                                            return (
                                                                                <tr key={doc.docName + index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td className="text-capitalize">{doc.docName}</td>
                                                                                    <td><i class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit bx bx-trash" onClick={() => removeDoc(index)}></i></td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                        <tr>

                                                                        </tr>
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        }
                                                        {/* add doc buton */}
                                                        {!adddocument && <button className="btn btn-sm btn-secondary" onClick={() => setadddocument(true)}>
                                                            Add Document
                                                        </button>
                                                        }
                                                        {/* doc add modal */}
                                                        {adddocument &&
                                                            <div>
                                                                <div className="col-12">

                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="form-group mb-4">
                                                                                <label htmlFor="">Select Document Type. <strong className="text-danger ">*</strong></label>
                                                                                <select
                                                                                    className="form-control text-capitalize"
                                                                                    onChange={(e) => {
                                                                                        setdocumentTypeId(e.target.value);
                                                                                    }}
                                                                                    name="document type"
                                                                                    required={true}
                                                                                >
                                                                                    <option className="text-black font-semibold ">
                                                                                        select..
                                                                                    </option>
                                                                                    {documentTypes && documentTypes.sort((a, b) => a.name.localeCompare(b.name))?.map((dT) => {
                                                                                        return (
                                                                                            <option
                                                                                                key={dT.id}
                                                                                                value={dT.id}
                                                                                            >
                                                                                                {dT.name?.toLowerCase().replace(/_/g, " ")}
                                                                                            </option>
                                                                                        );
                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                            <div className="form-group mb-4">
                                                                                <label htmlFor="">Document Name. <strong className="text-danger ">*</strong></label>
                                                                                <input type="text" className="form-control" value={docName} onChange={(e) => setdocName(e.target.value)} placeholder="Enter document name" required={true} />
                                                                            </div>
                                                                            <div className="form-group mb-4">
                                                                                <label htmlFor="">Document Upload. <strong className="text-danger ">*</strong></label>
                                                                                <div className="input-group mb-0">
                                                                                    <label className="input-group-text bg-info text-white cursor-pointer"
                                                                                        htmlFor="document1-1">
                                                                                        <i className="font-14px mdi mdi-paperclip"></i> Attach File
                                                                                    </label>
                                                                                    <input type="file" className="form-control" id="document1-1" onChange={e => handleFileRead(e)} required={true} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="col-12 mt-2">
                                                                    <button type='button' onClick={(e) => addDoc(e)} class="btn btn-primary">Add Document</button>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="submit" className='btn btn-sm btn-primary'> update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {activeLink === 5 && (
                                <div>
                                    <div class="container-fluid">

                                        {/* <!-- start page title --> */}
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                                    <h4 class="mb-sm-0 font-size-18">All Messages</h4>


                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- end page title --> */}

                                        <div class="row">
                                            <div class="col-12">
                                                {/* <!-- Right Sidebar --> */}
                                                <div class="mb-3">
                                                    <div class="card">
                                                        <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                                                            <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                                                                <div class="d-flex align-items-center flex-grow-1">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-body the-inbox">
                                                            <table id="emailDataTable-btns" class="table   nowrap w-100 table-hover mt-0 mb-0">
                                                                <thead>
                                                                    <tr class="d-none">
                                                                        <th>Mode</th>
                                                                        <th>
                                                                            {/* <!-- this is where the index is stored --> */}
                                                                        </th>
                                                                        <th>Status</th>
                                                                        <th>Name</th>
                                                                        <th>Message Content</th>
                                                                        <th>Date</th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody class="table-hover">
                                                                    {communication?.map((com, index) => {
                                                                        let message = JSON.parse(com.data)
                                                                        return (
                                                                            <tr key={com.id} onClick={() => { setMessageData(communication[index]); setShowMessage(true) }} class="text-nowrap" data-toggle="modal" data-target="#messageDetails">
                                                                                <td>{index + 1}</td>
                                                                                {/* <tr class="text-nowrap" data-toggle="modal" data-target="#messageDetails"> */}
                                                                                <td class="">
                                                                                    {/* <!-- put the index here --> */}
                                                                                    <span class=" font-size-18 d-none d-md-flex">
                                                                                        {com.communicationType !== "EMAIL" ? <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">Email</span></i> :
                                                                                            <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">Sms</span></i>}
                                                                                    </span>
                                                                                    <span class=" font-size-18 d-flex d-md-none">
                                                                                        <br />
                                                                                        <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">{com.communicationType}</span></i>
                                                                                    </span>
                                                                                </td>
                                                                                <td class="text-capitalize d-none d-md-table-cell">{com.createdBy}</td>
                                                                                {com.communicationType == "EMAIL" &&
                                                                                    <td class="the-msg the-msg">
                                                                                        <span>{message?.model?.message}</span>
                                                                                    </td>}
                                                                                {com.communicationType == "SMS" &&
                                                                                    <td class="the-msg">
                                                                                        <span>{message?.text}</span>
                                                                                    </td>}
                                                                                <td class="text-capitalize d-none d-md-table-cell">{moment(com.dateTimeCreated).format("ddd MMM DD")}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    )}
                                                                </tbody>

                                                            </table>

                                                        </div>


                                                    </div>



                                                </div>
                                                {/* <!-- end Col-9 --> */}

                                            </div>

                                        </div>
                                        {/* <!-- End row --> */}

                                    </div>
                                    {/* <!-- container-fluid --> */}
                                    <ViewMessage show={showMessage} messageData={messageData} closeMessage={closeMessage} />

                                </div>


                            )
                            }
                        </div>

                    </div>
                </div>
            </div>
            {/* raise issues modal  */}
            <div class="modal fade issue-modal pb-5" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered mb-5">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myLargeModalLabel">Report an Issue for <span className="text-capitalize">{tenancy?.premiseUnit?.unitName}</span></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(e) => submitIssue(e)}>
                            <div class="modal-body">
                                <div class="col-12">
                                    <address>
                                        <strong>Unit Details:</strong><br />
                                        <span class="fw-semibold">Current Tenant:</span> {tenancy?.tenant?.firstName} {tenancy?.tenant?.lastName}  <br />
                                        {tenancy?.tenant?.email} , {tenancy?.tenant?.phoneNumber} <br />
                                        {/* Hse No. 410, 90 Degrees By Tsavo */}
                                        <br />
                                        <span class="today-date"> <strong> Date :</strong>   {new Date().toLocaleDateString()}</span><br />
                                        {/* <span class="fw-semibold">Being Reported By </span> { AuthService.getCurrentUserName()}<br /> */}
                                    </address>
                                </div>
                                <div class="col-12">
                                    <div class="mb-4 ">
                                        <label for="agreement-typ">Issue Type<strong class="text-danger ">*</strong></label>
                                        <select class="form-control" title="Select critical level" onChange={(e) => handleIssues(e)} name="issueTypeId">
                                            <option></option>
                                            {issueTypes?.map((item) => (
                                                <option key={item.id} value={item.id}> {item.name}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-4 ">
                                        <label for="basicpill-firstname-input ">Issue description <strong class="text-danger ">*</strong></label>
                                        <textarea required value={issueDetails.description} name="description" class="form-control " placeholder="Enter details on the issue" id="" cols="30" rows="5" onChange={(e) => handleIssues(e)} ></textarea>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type='submit' class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PremiseTenancy