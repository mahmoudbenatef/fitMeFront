import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function DayPlanComponent() {
  let { id } = useParams();
  let { date } = useParams();
  return (
    <>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr style={{ textAlign: "center", fontSize: "40px" }}>
                  <th>Camp User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Link
                      className="nav-link"
                      to={`/admin/camp/${id}/plan/${date}/regular`}
                    >
                      Regular Users
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Link
                      className="nav-link"
                      to={`/admin/camp/${id}/plan/${date}/exceptional`}
                    >
                      Exceptional Users
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
    </>
  );
}
