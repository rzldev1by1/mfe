import React, { Component } from "react";
import { CButton, CCard, CCardBody, CRow, CCol } from "@coreui/react";
import "./StockAgeProfile.scss";
import endpoints from 'helpers/endpoints'
import StockAgeProfileTable from "./Table/StockAgeProfileTable";
import CustomPagination from "shared/table/CustomPagination";
import axios from "axios";
import HeaderTitle from "shared/container/TheHeader";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";

const columns = [
  {
    Header: "",
    headerClassName: "border-left ",
    columns: [
      {
        accessor: "site",
        Header: "Site",
        sortable: true,
        headerClassName: "padding-top-0 p-r-2",
        className:"p-r-2",
      },
      {
        accessor: "client",
        Header: "Client",
        sortable: true,
        headerClassName: "padding-top-0",
      },
      {
        accessor: "product",
        Header: "Product",
        sortable: true,
        headerClassName: "padding-top-0",
      },
      {
        accessor: "product_name",
        Header: "Description",
        className: "w-200",
        sortable: true,
        headerClassName: "padding-top-0 w-200",
      },
      {
        accessor: "packdesc_1",
        Header: "UOM",
        // className: "w-50",
        sortable: true,
        headerClassName: "padding-top-0",
      },
    ],
  },
  {
    Header: "Age Profile",
    columns: [
      {
        Header: "Lively",
        headerClassName: "link-color",
        className: "border-left",
        accessor: "34508",
      },
      {
        Header: "Acceptable",
        headerClassName: "link-color",
        accessor: "0",
      },
      {
        Header: "Marginal",
        headerClassName: "link-color",
        accessor: "0",
      },
      {
        Header: "Shelf Life",
        headerClassName: "link-color",
        accessor: "shelf_life",
      },
      {
        Header: "Dead",
        headerClassName: "link-color",
        className: "border-right",
        accessor: "0",
      },
    ],
  },
  {
    Header: "Total Quantities",
    columns: [
      {
        Header: "On Hand",
        headerClassName: "link-color",
        accessor: "on_hand",
      },
      {
        Header: "Expected In",
        headerClassName: "link-color",
        accessor: "expected_in",
      },
      {
        Header: "Expected Out",
        headerClassName: "link-color",
        accessor: "expected_out",
      },
    ],
  },
];

class StockAgeProfile extends Component {
  state = {
    search: "",
    site: null,
    client: null,
    fields: columns,
    data: [],
    pagination: {},
    dimension: { width: 0, height: 0 },
  };

  componentDidMount = () => {
    this.updateDimension();
    window.addEventListener("resize", this.updateDimension);
    // set automatic table height
    this.getSite();
    this.getClient();
    this.getStockAgeProfile();
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimension);
  }

  updateDimension = () => {
    const height = (window.innerHeight - 250);
    // const height = {overflow: 'visible', height: heightAdjust}
    this.setState({ dimension: { width: window.innerWidth, height } });
  };

  getSite = async () => {
    const { data } = await axios.get(endpoints.getSite);
    const siteData = data.map((d) => ({
      value: d.site,
      label: `${d.site}: ${d.name}`,
    }));
    const site = { value: "all", label: "All Site" };
    siteData.splice(0, 0, site);
    this.setState({ siteData });
  };
  getClient = async () => {
    const { data } = await axios.get(endpoints.getClient);
    const clientData = data.map((d) => ({
      value: d.code,
      label: `${d.code}: ${d.name}`,
    }));
    const client = { value: "all", label: "All Client" };
    clientData.splice(0, 0, client);
    this.setState({ clientData });
  };

  getStockAgeProfile = async () => {
    let { search, site, client, pagination } = this.state;
    let urls = [];
    if (search) urls.push("searchParam=" + search);
    if (site) urls.push("site=" + site.value);
    if (client) urls.push("client=" + client.value);
    urls.push("page=" + (pagination.active || 1));
    const { data } = await axios.get(endpoints.stockAgeProfile + "?" + urls.join("&"));
    console.log(data);
    if (data?.data) {
      const getData = data.data;
      this.setState({
        pagination: {
          active: pagination.active || data.current_page,
          show: data.per_page,
          total: data.total,
        },
        data: getData,
      });
    } else {
      this.setState({ data: [] });
    }
  };
  render() {
    const {
      dimension,
      fields,
      data,
      pagination,
      site,
      client,
      siteData,
      clientData,
    } = this.state;
    return (
      <div className="stock-age-profile">
        <HeaderTitle
          breadcrumb={[{ to: "", label: "Stock Age Profile", active: true }]}
        />

        <CCard className="mb-3">
          <CCardBody className="px-3 py-3 h-4">
            <CRow className="row mr-0 ml-0">
              <CCol lg={3} className="px-0">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text border-right-0 bg-white">
                      <i className="iconU-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control pl-0 border-left-0"
                    placeholder="Enter a Product or Description"
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                </div>
              </CCol>
              <CCol lg={9} className="pr-0">
                <CRow className="l-r-0">
                  <CCol sm={6} lg={2} className="px-0">
                    <Select
                      name="site"
                      placeholder="Site"
                      value={site}
                      options={siteData}
                      onChange={(val) => this.setState({ site: val })}
                    />
                  </CCol>
                  <CCol sm={6} lg={2} className="pl-3 pr-0">
                    <Select
                      name="client"
                      placeholder="Client"
                      value={client}
                      options={clientData}
                      onChange={(val) => this.setState({ client: val })}
                    />
                  </CCol>
                  <CCol sm={12} lg={7} />
                  <CCol sm={12} lg={1} className="pr-0 pl-3 w-4vw">
                    <button
                      className="btn btn-search btn-primary float-right"
                      onClick={this.getStockAgeProfile}
                    >
                      SEARCH
                    </button>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <StockAgeProfileTable
          title="Stock Age profile"
          height={dimension.height}
          data={data}
          fields={fields}
          overflow="scroll"
          noDataText={"Please Wait..."}
          minRows='0'
        />
        <CustomPagination
          data={data}
          pagination={pagination}
          goto={(active) => {
            this.setState({ pagination: { ...pagination, active } }, () =>
              this.getStockAgeProfile()
            );
          }}
          export={
            <CButton className="btn btn-primary d-flex float-right px-3 align-items-center btn-export">
              <div className="export-export pr-3"/>
              EXPORT
            </CButton>
          }
        />
      </div>
    );
  }
}

export default StockAgeProfile;
