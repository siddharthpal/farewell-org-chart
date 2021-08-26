import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth(d => 200)
        .nodeHeight(d => 120)
        .onNodeClick((d, i, arr) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .childrenMargin(d => 50)
        .compactMarginBetween(d => 25)
        .compactMarginPair(d => 50)
        .neightbourMargin((a, b) => 25)
        .siblingsMargin(d => 25)
        .buttonContent(({ node, state }) => {
          return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
            node.children
              ? `<i class="fas fa-angle-up"></i>`
              : `<i class="fas fa-angle-down"></i>`
          }</span> ${node.data._directSubordinates}  </div>`;
        })
        .linkUpdate(function(d, i, arr) {
          d3.select(this)
            .attr('stroke', d =>
              d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9'
            )
            .attr('stroke-width', d =>
              d.data._upToTheRootHighlighted ? 5 : 1
            );

          if (d.data._upToTheRootHighlighted) {
            d3.select(this).raise();
          }
        })
        .nodeContent(function(d, i, arr, state) {
          const color = '#FFFFFF';
          return `
          <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
             <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
             <img src=" ${
               d.data.imageUrl
             }" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
             
            <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>

            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${
              d.data.name
            } </div>
            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
              d.data.positionName
            } </div>


         </div>
`;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
