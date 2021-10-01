import React from "react";
import { Form, Input, Button, Space, DatePicker, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import mandiLocations from "../../../config/mandLocations";
import crops from "../../../config/crops";
import { filterNil } from "../../../utils/utils";

import "./_style.scss";

const format = "DD-MM-YYYY";
const { Option } = Select;

const convertDateToStr = (date) => {
  return moment(date).format(format);
};


const convertStrToDate = (dateStr) => {
  return moment(dateStr, format);
};

class AddProcurement extends React.Component {
  constructor() {
    super();
    this.state = {
      procurementDate: convertDateToStr(moment()),
      measurement: "kg",
    };
  }

  handleDateChange = (date, dateString) => {
    this.setState({ procurementDate: convertDateToStr(date) });
  };

  handleMeasurementChange = (measurement) => {
    this.setState({ measurement });
  };

  onFinish = (values = {}, isSubmitting = true) => {
    if (!Object.keys(values).length) {
      return {};
    }

    let procurementDate = isSubmitting
    ? convertDateToStr(values.procurementDate)
    : convertStrToDate(values.procurementDate);

    values.procurementDate = procurementDate
    values = filterNil(values);
    console.log("values", values);

    if (isSubmitting) {
      this.props.handleSubmit(filterNil(values));
    } else {
      return filterNil(values)
    }
  };

  render() {
    const { procurementDate } = this.state;
    const result = this.onFinish(this.props.procurement, false)

    return (
      <div className="procurement">
        <div className="procurement__title">
          Add Procurement details for date {procurementDate}
        </div>

        <Form
          name="dynamic_form_nest_item"
          onFinish={this.onFinish}
          autoComplete="off"
          initialValues={!!Object.keys(result).length ? result : {
            procurementDate: moment(),            
          }}
        >
          <Form.Item
            name="procurementDate"
            label="Date Procurement"
            tooltip="Date Planted of the Fasal"
            className="datePlanted"
            rules={[{ required: true, message: "Fasal Name is required" }]}
          >
            <DatePicker
              size="middle"
              format={format}
              placeholder="Date Procured"
              onChange={this.handleDateChange}
            />
          </Form.Item>

          <Form.Item
            name="procurementMandi"
            label="Mandi of Procurement"
            tooltip="Mandi of Procurement of the Fasal"
            className="datePlanted"
            rules={[{ required: true, message: "Fasal Name is required" }]}
          >
            <Select onChange={this.handleMandiChange}>
              {Object.values(mandiLocations).map((mandi) => {
                return (
                  <Option value={mandi.id}>
                    {mandi.name},{mandi.area},{mandi.district}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.List name="procurements">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => {
                  return (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="center"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "cropProcured"]}
                        fieldKey={[fieldKey, "quantity"]}
                        label="Fasal Procured"
                        tooltip="Quantity Cutted of the Fasal"
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Select
                          onChange={this.handleMandiChange}
                          style={{ width: "80px" }}
                        >
                          {Object.values(crops).map((crop) => {
                            return <Option value={crop.id}>{crop.name}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "quantityProcured"]}
                        fieldKey={[fieldKey, "date"]}
                        label="Quantity Procured"
                        tooltip="Date Cutted of the Fasal"
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input size="middle" placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Measurement"
                        name={[name, "measurement"]}
                        fieldKey={[fieldKey, "measurement"]}
                        tooltip="Quantity Cutted of the Fasal"
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Select
                          onChange={this.handleMeasurementChange}
                          style={{ width: "80px" }}
                        >
                          <Option value="kg">Kgs</Option>
                          <Option value="qts">Quintals</Option>
                          <Option value="tonne">Tonnes</Option>
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  );
                })}

                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Procurement
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddProcurement;
