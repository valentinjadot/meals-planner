import { useEffect, useState } from 'react';
import _ from 'lodash';
import getUsers from '../queries/getOrder';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const groupByDate = (data) => _.groupBy(data, (e) => e.executionDate);
  const groupByMeal = (data) => _.groupBy(data, (e) => e.meal);

  const structureData = (data) => {
    const groupedByDate = groupByDate(data);
    const groupedByDateAndMeal = {};
    Object.keys(groupedByDate).forEach((date) => {
      groupedByDateAndMeal[date] = groupByMeal(groupedByDate[date]);
    });
    return groupedByDateAndMeal;
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
