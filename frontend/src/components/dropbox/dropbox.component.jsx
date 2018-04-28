import React, {Fragment, PureComponent} from 'react';
import {Table} from "reactstrap";
import moment from "moment";
import SpinnerLoader from "../shared/loader/spinner.loader.component";

const reactappapibase = process.env.REACT_APP_API_BASE;
const baseURL = (reactappapibase === "/" ? '' : reactappapibase) + '/api';

class Dropbox extends PureComponent {
  render() {
    const {deleteFile, files, showFull} = this.props;

    return (
      <Table>
        <thead>
        <tr>
          <th><a>Filename</a></th>
          <th>Uploaded on</th>
          {showFull &&
          <Fragment>
            <th>Last download on</th>
            <th>Delete</th>
          </Fragment>
          }
        </tr>
        </thead>
        <tbody>
        {files.map((f, i) => (
          <tr key={i}>
            <td><a href={`${baseURL}/dropbox/download?key=${f.key}`} download>{f.name}</a></td>
            <td>{moment(f.uploaded).format('M/D/YYYY')}</td>
            {showFull &&
            <Fragment>
              <td>{f.lastAccessed ? moment(f.lastAccessed).format('M/D/YYYY') : 'Never downloaded'}</td>
              <td>
                {!f.isDeleting ?
                  <a href={'#'} onClick={e => {
                    e.preventDefault();
                    if (deleteFile) {
                      deleteFile(f.key);
                    }
                  }
                  }>Delete</a>
                  :
                  <SpinnerLoader width={'24px'} height={'24px'}/>
                }
              </td>
            </Fragment>
            }
          </tr>
        ))}
        </tbody>
      </Table>
    );
  }
}

export default Dropbox;