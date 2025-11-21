// All Topics Index - Import and export all topic content
import { reactTopics } from './reactTopics';
import { htmlTopics } from './htmlTopics';
import { cssTopics } from './cssTopics';
import { nodeTopics } from './nodeTopics';
import { javascriptTopics } from './javascriptTopics';

// Export all topics organized by category
export const allTopics = {
  // JavaScript Topics (IDs 100+)
  100: javascriptTopics.equalityOperators,
  101: javascriptTopics.firstClassFunction,
  102: javascriptTopics.letVsVar,
  103: javascriptTopics.promises,
  104: javascriptTopics.callApplyBind,
  105: javascriptTopics.currying,
  106: javascriptTopics.higherOrderFunctions,
  109: javascriptTopics.callbacks,
  110: javascriptTopics.nullVsUndefined,
  111: javascriptTopics.iife,
  112: javascriptTopics.setTimeout,
  113: javascriptTopics.eventBubbling,
  114: javascriptTopics.jsonStringify,
  115: javascriptTopics.strictMode,
  116: javascriptTopics.temporalDeadZone,
  117: javascriptTopics.objectCreation,
  118: javascriptTopics.closures,
  120: javascriptTopics.prototypes,
  122: javascriptTopics.spreadOperator,
  123: javascriptTopics.arrowFunctions,
  125: javascriptTopics.eventDelegation,
  128: javascriptTopics.destructuring,
  129: javascriptTopics.asyncAwait,
  130: javascriptTopics.promiseMethods,
  131: javascriptTopics.eventLoopEnhanced,
  132: javascriptTopics.mapFilterReduce,
  133: javascriptTopics.setInterval,
  134: javascriptTopics.shallowDeepCopy,
  135: javascriptTopics.restParameters,
  136: javascriptTopics.templateLiterals,
  137: javascriptTopics.defaultParameters,
  138: javascriptTopics.symbolType,
  139: javascriptTopics.eventCapturing,
  140: javascriptTopics.preventDefault,
  141: javascriptTopics.stopPropagation,
  142: javascriptTopics.jsonParse,
  143: javascriptTopics.regex,
  144: javascriptTopics.typeCoercion,
  145: javascriptTopics.nan,
  146: javascriptTopics.memoization,
  147: javascriptTopics.polyfills,
  148: javascriptTopics.v8Engine,
  149: javascriptTopics.sliceSplice,
  150: javascriptTopics.arrayMethodsAdvanced,
  151: javascriptTopics.stringMethods,
  152: javascriptTopics.objectMethods,
  153: javascriptTopics.freezeSeal,
  154: javascriptTopics.setMap,
  155: javascriptTopics.weakSetMap,
  156: javascriptTopics.generators,
  157: javascriptTopics.iterators,
  158: javascriptTopics.arrayFromOf,
  159: javascriptTopics.executionContext,
  160: javascriptTopics.lexicalEnvironment,
  161: javascriptTopics.callStack,
  162: javascriptTopics.eventQueue,
  163: javascriptTopics.bom,
  164: javascriptTopics.dynamicTyping,
  165: javascriptTopics.thisKeyword,
  166: javascriptTopics.anonymousFunctions,
  167: javascriptTopics.thunkFunctions,
  168: javascriptTopics.compiledInterpreted,
  169: javascriptTopics.caseSensitivity,
  170: javascriptTopics.javaVsJs,
  
  // React Topics
  3: reactTopics.useState,
  5: reactTopics.useEffect,
  6: reactTopics.useMemo,
  51: reactTopics.virtualDOM,
  52: reactTopics.propsVsState,
  
  // HTML Topics  
  8: htmlTopics.semantic,
  9: htmlTopics.html5,
  
  // CSS Topics
  10: cssTopics.boxModel,
  11: cssTopics.flexbox,
  12: cssTopics.grid,
  59: cssTopics.selectors,
  60: cssTopics.positioning,
  61: cssTopics.animations,
  
  // Node.js Topics
  13: nodeTopics.basics,
  58: nodeTopics.streams
  
  // More topics will be added here
};

// Get topic by ID
export const getTopicById = (id) => {
  return allTopics[id] || null;
};

// Get topics by category
export const getTopicsByCategory = (category) => {
  return Object.values(allTopics).filter(topic => topic.category === category);
};
