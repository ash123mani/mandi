import React from "react";

import { getProcurements } from "../../utils/firebaseUtils";
import Loader from "../../components/loader";

import EmptyList from "./empty-list";
import FasalListNew from "./fasal-list-new";

import "./_style.scss";

class Home extends React.Component {
  state = {
    procurements: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    getProcurements()
      .then((procurements) => {
        this.setState({ procurements });
        console.log("fasals", procurements)
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { procurements, isLoading } = this.state;


    if (isLoading) {
      return (
        <div className="home">
          <Loader />
        </div>
      );
    }

    if (!procurements.length) {
      return (
        <div className="home">
          <EmptyList />
        </div>
      );
    }

    return <FasalListNew procurements={procurements} />;
  }
}

export default Home;
