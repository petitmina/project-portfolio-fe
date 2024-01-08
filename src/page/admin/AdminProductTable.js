import React from "react";
import { Button, Table } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const AdminProductTable = ({ header, data, deleteItem, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th>{item.name}</th>
                <th>
                  {
                    <CurrencyFormat
                      value={item.price}
                      displayType="text"
                      thousandSeparator={true}
                      prefix={"₩"}
                    />
                  }
                </th>
                <th>
                  {Object.keys(item.stock).map((color, index) => (
                    <div key={index}>
                      {color}:{item.stock[color]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image"/>
                </th>
                <th>{item.status}</th>
                <th >
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openEditForm(item)}
                    variant="secondary"
                  >
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProductTable;
