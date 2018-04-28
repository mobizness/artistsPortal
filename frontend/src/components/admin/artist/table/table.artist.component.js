import React from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {Link} from "react-router-dom";

class ArtistTable extends React.PureComponent {
  render() {
    return (
        <Container>
          <Row style={{justifyContent: 'center'}}>
            {this.props.items.length ?
              <Table hover>
                <thead>
                <tr>
                  <th>Artist</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Active</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.props.items.map(item => item.artist).map(item => (
                  <tr key={item.id}>
                    <td>{item.artistKey}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td><input type="checkbox" disabled checked={item.active}/></td>
                    <td>
                      <span style={{paddingRight: '10px'}}><Link to={`/dropbox/${item.artistKey}`}>Dropbox</Link></span>
                      <Link to={`/artists/edit/${item.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
              :
              <Col className={'text-center'} xs={{size: 6}}>
                <p>No artists available yet.
                </p>
                <p>
                  You can create some by using create artist button.
                </p>
              </Col>
            }
          </Row>
        </Container>
      );
  }
}

export default ArtistTable;