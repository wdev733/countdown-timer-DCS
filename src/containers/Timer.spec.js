import React from "react";
import { shallow } from "enzyme";
import Timer from "./Timer";
import CountDown from "../components/CountDown";

describe("<Timer />", () => {
  it("should contain <CountDown />", () => {
    const wrapper = shallow(<Timer />);

    expect(wrapper.find(CountDown).length).toEqual(1);
  });
});
