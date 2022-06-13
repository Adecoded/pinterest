import { useEffect ,useState} from 'react';
import MasonryList from '../components/masonryList';
import { useNhostClient } from '@nhost/react';
import { Alert } from 'react-native';
export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pins,setPins] =useState([]);
  const [loading,setLoading] =useState(false);
    const fetchPins = async () => {
      setLoading(true);
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
      setLoading(false);
      };
      useEffect(() => { fetchPins(); }, []);

  return <MasonryList  pins={pins} onRefresh={fetchPins} refreshing={loading}/>;
    }
