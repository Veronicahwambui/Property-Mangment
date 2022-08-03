/* global $*/
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'

import requestsServiceService from '../../services/requestsService.service'

function MessageTemplates() {
    const [messageTemplates, setMessageTemplates] = useState([])
    const [template, setTemplate] = useState('')
    const [templateName, setTemplateName] = useState('')
    const [error, setError] = useState({
        message: "",
        color: ""
    });


    let clientId = AuthService.getClientId()
    useEffect(() => {
        fetchAll()
    }, [])
    const fetchAll = () => {
        requestsServiceService.getMessageTemplate(clientId).then((res) => {
            setMessageTemplates(res.data.data)
        })
    }
    const createTemplate = (e) => {
        e.preventDefault()

        var templateString = template;

        var params = templateString.match(/{{(.*?)}}/g);

        if (params != null && params.length > 0) {

            var paramsText = params.toString();
            var paramsWithoutBraces = paramsText.replace(/{{|}}/gi, "");

        }


        let data = JSON.stringify({
            clientId: clientId,
            id: null,
            language: "ENG",
            parameterList: paramsWithoutBraces,
            template: template,
            templateName: templateName?.toLocaleUpperCase(),
            templateType: "SMS"
        })

        requestsServiceService.createMessageTemplate(data).then((res) => {
            fetchAll()
            $("#createTemplate").modal("hide");

            if (res.data.status) {
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
            $("#createTemplate").modal("hide");

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

    return (
        <div className="page-content">
            <div className="container-fluid">

                {/* <!-- start page title --> */}
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0 font-size-18">All Message Templates</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li class="breadcrumb-item active">Message Templates</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>

                {/* table */}
                <div className="row">
                    <div className="col-12">

                        <div className="mb-4">
                            <button className="btn btn-primary btn-md" data-toggle="modal" data-target="#createTemplate"> Create Template</button>
                        </div>
                        {/* table  */}
                        <div className="card-body the-inbox">
                            {error.color !== "" &&
                                <div className={"alert alert-" + error.color} role="alert">
                                    {error.message}
                                </div>
                            }
                            <table class="table  table-nowrap table-hover table-responsive overflow-visible contacts-table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th>name</th>
                                        <th>Langauge</th>
                                        <th>date created</th>
                                        <th>last modified</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messageTemplates?.map((temp, index) => {

                                        return (
                                            <tr key={index}>
                                                <td class="text-capitalize">{index + 1}</td>
                                                <td className="text-capitalize">{temp.templateName?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                <td>{temp.language}</td>
                                                <td>{moment(temp.dateTimeCreated).format("ddd DD MMM YYYY [at] hh:mm a")}</td>
                                                <td>{moment(temp.lastModifiedDate).format("ddd DD MMM YYYY [at] hh:mm a")}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <!-- message details modal --> */}
                <div class="modal fade" id="createTemplate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content border-radius-0">
                            {error.color !== "" &&
                                <div className={"alert alert-" + error.color} role="alert">
                                    {error.message}
                                </div>
                            }
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Create Template</h5>
                                <span class="close font-28 cursor-pointer" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </span>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={(e) => createTemplate(e)}>
                                    <div className="form-group">
                                        <label htmlFor="">Template name</label>
                                        <input type="text" required placeholder='Enter template name' className="form-control" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="">Template</label>
                                        <textarea required name="description" class="form-control" placeholder="Enter desired template" id="" cols="30" rows="5" value={template} onChange={(e) => setTemplate(e.target.value)} ></textarea>
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-sm mt-3 float-end'> Create Template</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default MessageTemplates