import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiServices } from "../../../API/ApiServices";
import { campContext } from "../../../contexts/campContext";
import LoadingCompoenet from "../../reusableComponents/LoadingComponent";
import PaginationComponent from "../../reusableComponents/PaginationComponent";

export default function ListCampsComponent({ changeState }) {
  const [camps, setCamps] = useState([]);
  const cmpContext = useContext(campContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletedElement, setDeletedElement] = useState(null);
  useEffect(() => {
    if (deletedElement) {
      ApiServices.deleteCamp(deletedElement)
        .then(() => {
          cmpContext.setNewOneAdded(cmpContext.newOneAdded + 1);
        })
        .catch();
    }
  }, [deletedElement]);

  useEffect(() => {
    ApiServices.listCamps(`?page=${page}&limit=${6}`)
      .then((data) => {
        setCamps(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [cmpContext.newOneAdded, page]);
  return (
    <>
      {loading ? (
        <LoadingCompoenet />
      ) : (
        <div>
          <div className="row justify-content-center mt-4 ">
            <div className="col-md-8 ">
              <Table striped bordered hover variant="dark">
                <caption className="text-light">List of camps</caption>
                <thead key={-1}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Camp</th>
                    <th colSpan={2} scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {camps.data &&
                    camps.data.length > 0 &&
                    camps.data.map((cat, index) => {
                      return (
                        <tr key={cat._id.toString()}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              className="nav-link"
                              to={`/admin/camp/${cat._id}/plan`}
                            >
                              {new Date(cat.date).toLocaleDateString()}
                            </Link>
                          </td>

                          <td className="text-center">
                            <EditIcon
                              fontSize="large"
                              style={{
                                cursor: "pointer",
                              }}
                              className="btn-warning text-white"
                              onClick={() => {
                                var d = new Date(cat.date),
                                  month = "" + (d.getMonth() + 1),
                                  day = "" + d.getDate(),
                                  year = d.getFullYear();

                                if (month.length < 2) month = "0" + month;
                                if (day.length < 2) day = "0" + day;
                                [year, month, day].join("-");
                                changeState({
                                  status: "edit",
                                  value: {
                                    ...cat,
                                    date: [year, month, day].join("-"),
                                  },
                                });
                              }}
                            />
                          </td>
                          <td className="text-center">
                            <DeleteIcon
                              fontSize="large"
                              className="btn-danger"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setDeletedElement(cat._id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  {camps.data && camps.data.length === 0 && (
                    <tr>
                      <td colSpan={4}> nodata yet</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row justify-content-center mt-4 ">
            <div className="d-flex justify-content-center">
              <PaginationComponent
                count={camps.count}
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
