import {fetchJsonAuthorized, fetchQueryAuthorized} from "./fetch";

export default () => {
  const list = () => {
    return fetchJsonAuthorized('/api/admin/artist/list');
  };

  const create = (active, artistKey, name, email) => {
    return fetchQueryAuthorized('/api/admin/artist/create', {
      method: 'POST',
      body: JSON.stringify({
        active,
        artistKey,
        name,
        email,
      })
    })
  };

  const edit = (id, active, artistKey, name, email) => {
    return fetchQueryAuthorized('/api/admin/artist/create', {
      method: 'POST',
      body: JSON.stringify({
        id,
        active,
        artistKey,
        name,
        email,
      })
    })
  };

  return {
    list,
    create,
    edit,
  }
};