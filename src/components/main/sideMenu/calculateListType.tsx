/**
 * 타입 별 정산 리스트
 *
 */
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  calculateListTypeActions,
  calculateListTypeCountActions,
} from "../../../redux/modules/reducer/calculateListReducer";
import { getCalculateTypeCount } from "../../../apis/api/calculate";
import * as calculateListTypeStyle from "../../../styles/main/calculateListTypeStyle";

function CalculateListType() {
  const dispatch = useAppDispatch();
  const calculateListType = useAppSelector((state) => state.calculateListType);
  const calculateListTypeCount = useAppSelector(
    (state) => state.calculateListTypeCount
  );

  /* 타입별 리스트 개수 가져오기 */
  const calculateType_Count = async () => {
    const count = await getCalculateTypeCount({ params: { type: "count" } });
    if (count.data.countList) {
      dispatch(
        calculateListTypeCountActions.setInitialCalculateListTypeCount(
          count.data.countList
        )
      );
    }
  };

  const clickCalculateType1 = () => {
    dispatch(calculateListTypeActions.setInitialCalculateListType("1"));
  };
  const clickCalculateType2 = () => {
    dispatch(calculateListTypeActions.setInitialCalculateListType("2"));
  };
  const clickCalculateType3 = () => {
    dispatch(calculateListTypeActions.setInitialCalculateListType("3"));
  };
  const clickCalculateType4 = () => {
    dispatch(calculateListTypeActions.setInitialCalculateListType("4"));
  };

  useEffect(() => {
    calculateType_Count();
  }, []);

  return (
    <calculateListTypeStyle.Conatiner type={calculateListType.type}>
      <ul>
        <li onClick={clickCalculateType1}>
          <p># 전체 약속</p>
          <p>
            {calculateListTypeCount.length
              ? calculateListTypeCount[0].count
              : 0}
          </p>
        </li>
        <li onClick={clickCalculateType2}>
          <p># 정산중인 약속</p>
          <p>
            {calculateListTypeCount.length
              ? calculateListTypeCount[1].count
              : 0}
          </p>
        </li>
        <li onClick={clickCalculateType3}>
          <p># 정산 완료된 약속</p>
          <p>
            {calculateListTypeCount.length
              ? calculateListTypeCount[2].count
              : 0}
          </p>
        </li>
        <li onClick={clickCalculateType4}>
          <p># 즐겨찾기 약속</p>
          <p>
            {calculateListTypeCount.length
              ? calculateListTypeCount[3].count
              : 0}
          </p>
        </li>
      </ul>
    </calculateListTypeStyle.Conatiner>
  );
}

export default CalculateListType;
