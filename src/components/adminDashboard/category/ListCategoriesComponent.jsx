import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ApiServices } from "../../../API/ApiServices";
import { categoryContext } from "../../../contexts/categoryContext";
import LoadingCompoenet from "../../reusableComponents/LoadingComponent";
import PaginationComponent from "../../reusableComponents/PaginationComponent";

export default function ({ changeState }) {
  const [categories, setCategories] = useState([]);
  const catContext = useContext(categoryContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletedElement, setDeletedElement] = useState(null);
  useEffect(() => {
    if (deletedElement) {
      ApiServices.deleteCategory(deletedElement)
        .then(() => {
          catContext.setNewOneAdded(deletedElement);
        })
        .catch();
    }
  }, [deletedElement]);

  useEffect(() => {
    ApiServices.listCategories(`?page=${page}&limit=${6}`)
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [catContext.newOneAdded, page]);
  return (
    <>
      {loading ? (
        <LoadingCompoenet />
      ) : (
        <div>
          <div className="row justify-content-center mt-4 ">
            <div className="col-md-8 ">
              <Table striped bordered hover variant="dark">
                <caption style={{ color: "white" }}>List of categories</caption>
                <thead key={-1}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category</th>
                    <th colSpan={2} scope="col" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.data &&
                    categories.data.length > 0 &&
                    categories.data.map((cat, index) => {
                      return (
                        <tr key={cat._id.toString()}>
                          <td>{index + 1}</td>
                          <td>{cat.label}</td>
                          <td className="text-center">
                            <EditIcon
                              style={{
                                cursor: "pointer",
                              }}
                              fontSize="large"
                              className="btn-warning text-white"
                              onClick={() => {
                                changeState({
                                  status: "edit",
                                  value: { ...cat },
                                });
                              }}
                            />
                          </td>
                          <td className="text-center">
                            <DeleteIcon
                              fontSize="large"
                              style={{
                                cursor: "pointer",
                              }}
                              className="btn-danger"
                              onClick={() => {
                                setDeletedElement(cat._id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  {categories.data && categories.data.length === 0 && (
                    <tr>
                      <td colSpan={4}> nodata yet</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row justify-content-center mt-4 ">
            <div className="d-flex justify-content-center ">
              <PaginationComponent
                count={categories.count}
                page={page}
                setPage={setPage}
              ></PaginationComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
