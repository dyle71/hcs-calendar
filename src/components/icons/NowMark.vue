<template>
  <div class="now-mark">
    <svg class="left circle">
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
    <svg class="line">
      <rect x="0" y="0" width="100%" height="100%" />
    </svg>
    <svg class="right circle">
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
  </div>
</template>

<style scoped>
.now-mark {
  display: block;
  background-color: black;
  width: inherit;
  height: inherit;
}

.now-mark svg {
  display: block;
  position: absolute;
  fill: #c95c5c;
  stroke: #c95c5c;
}

.now-mark svg.circle {
  width: 7px;
  height: 7px;
  top: calc((100% - 7px) / 2);
}

.now-mark svg.left {
  left: -5px;
}

.now-mark svg.line {
  width: 100%;
  height: 2px;
  top: calc((100% - 2px) / 2);
}

.now-mark svg.right {
  right: -5px;
}
</style>
