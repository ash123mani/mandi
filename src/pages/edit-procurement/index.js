import React, { useState, Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  getSingleProcurement,
  addProcurement,
} from "../../utils/firebaseUtils";
import ProcurementForm from "../../components/forms/procurement-form";
import Loader from "../../components/loader";

const EditFasal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [procurement, setProcurement] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleProcurement(id).then((res) => {
      console.log("editotDou", res);
      setProcurement(res);
      setIsLoading(false);
    });
  }, [id, history]);

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    addProcurement(id, data).then(() => {
      setIsSubmitting(false);
      history.push("/");
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <ProcurementForm handleSubmit={handleSubmit} procurement={procurement} />
      {isSubmitting && <Loader withOverlay />}
    </Fragment>
  );
};

export default EditFasal;
