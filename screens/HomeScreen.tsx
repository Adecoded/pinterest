import { useEffect ,useState} from 'react';
import MasonryList from '../components/masonryList';
import { useNhostClient } from '@nhost/react';
import { Alert } from 'react-native';
export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pins,setPins] =useState([]);
    const fetchPins = async () => {
      const response = await nhost.graphql.request(`
      query {
      pins {
      id
      image
      created_at
      title
      user_id
      }
      }
      `);
      if (response.error){
        Alert.alert("Erroe fetching pins")
      }else{
        setPins(response.data.pins);
      }
      };
      useEffect(() => { fetchPins(); }, []);

  return <MasonryList  pins={pins}/>;
    }
