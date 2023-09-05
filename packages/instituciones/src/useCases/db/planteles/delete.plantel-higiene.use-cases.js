const { checkers } = require('@siiges-services/shared');

const deletePlantelHigiene = (findOneQuery, deleteQuery) => async (data) => {
  const { plantelId, higieneId } = data;

  const plantelHigiene = await findOneQuery(data);
  checkers.throwErrorIfDataIsFalsy(plantelHigiene, 'plantelesHigienes', data);

  const plantelHigieneDeleted = await deleteQuery({ plantelId, higieneId });

  return plantelHigieneDeleted;
};

module.exports = deletePlantelHigiene;
