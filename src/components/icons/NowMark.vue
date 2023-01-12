<template>
  <div class="now-mark">
    <svg class="left-circle">
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
    <svg class="line">
      <rect x="0" y="0" width="100%" height="100%" />
    </svg>
    <svg class="right-circle">
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
  </div>
</template>

<style scoped>
.now-mark {
  display: block;
  position: absolute;
  background-color: black;
}

.now-mark svg {
  display: block;
  position: absolute;
  fill: #cc1818;
  stroke: #cc1818;
}

.now-mark svg.left-circle {
  width: 12px;
  height: 12px;
  top: calc((100% - 10px) / 2);
  left: -5px;
}

.now-mark svg.line {
  width: 100%;
  height: 3px;
  top: 50%;
}

.now-mark svg.right-circle {
  width: 12px;
  height: 12px;
  top: calc((100% - 10px) / 2);
  right: -5px;
}
</style>
