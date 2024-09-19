const apiDomain = process.env.NEXT_PUBLIC_DOMAIN_API || null;

async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`,{ cache: 'no-store' });
 
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchPropertyById(id){
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
          return null;
        }
    
        const res = await fetch(`${apiDomain}/properties/${id}`, {cache:'no-store'});
    
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
    
        return res.json();
      } catch (error) {
        console.log(error);
        return null;
      }
}

async function fetchPropertiesByUserId(userId){
  try {
      // Handle the case where the domain is not available yet
      if (!apiDomain) {
        return null;
      }

      const res = await fetch(`${apiDomain}/properties/user/${userId}`, {cache:'no-store'});

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
}

async function DeletePropertyById(id){
  try {
      // Handle the case where the domain is not available yet
      if (!apiDomain) {
        return null;
      }
  
      const res = await fetch(`${apiDomain}/properties/${id}`, {method: 'DELETE',}, {cache:'no-store'});
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      console.log("json: ", res.json())
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
}


export {fetchProperties, fetchPropertyById, fetchPropertiesByUserId, DeletePropertyById};