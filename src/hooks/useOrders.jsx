import { useEffect, useState } from 'react';
import _ from 'lodash';
import getUsers from '../queries/getOrder';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const orderByDate = (data) => _.groupBy(data, (e) => e.executionDate);
  const orderByMeal = (data) => _.groupBy(data, (e) => e.meal);

  const structureData = (data) => {
    const byDate = orderByDate(data);
    const byDateAndMeal = {};
    Object.keys(byDate).forEach((date) => {
      byDateAndMeal[date] = orderByMeal(byDate[date]);
    });
    return byDateAndMeal;
  };

  const fetchOrders = async () => {
    const data = await getUsers();
    if (data) {
      console.log('structureData:', structureData(data));
      setOrders(
        structureData(data),
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [reload]);

  return [orders, triggerReload];
}
