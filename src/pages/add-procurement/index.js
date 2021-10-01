import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import ProcurementForm from "../../components/forms/procurement-form"
import Loader from '../../components/loader'

import { uuidv4 } from "../../utils/utils";
import { addProcurement } from "../../utils/firebaseUtils";

const AddProcurement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory();


  const handleSubmit = (values) => {
    const procurementId = uuidv4();

    setIsSubmitting(true)
    addProcurement(procurementId, values).finally(() => {
      setIsSubmitting(false)
      history.push("/")
    });
  }

  return (
    <Fragment>
      <ProcurementForm handleSubmit={handleSubmit}/>
      {isSubmitting && <Loader withOverlay />}
    </Fragment>
  );
}

export default AddProcurement;
