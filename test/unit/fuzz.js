import Fuzz from '../../src/fuzz';
import Item from '../../src/item';
import ResultItem from '../../src/result-item';

describe('Fuzz', () => {
  const itemsStr = ['string', 'String', 'match', 'something'];

  // const itemsNum = [1, 2, 3];

  describe('constructor', () => {
    it('should construct properly', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance).to.be.ok;
      expect(fuzzInstance).to.be.instanceof(Fuzz);
      expect(fuzzInstance[0]).to.be.a('string');
      expect(fuzzInstance.main[0]).to.be.instanceof(Item);
    });

    it('sould throw an error if constructor argument is not array', () => {
      expect(() => new Fuzz('item')).to.throw(Error, 'Argument to Fuzz should be an array');
    });

    it('sould throw an error if array is not of strings', () => {
      expect(() => new Fuzz([1])).to.throw(Error, 'Argument to Fuzz should be an array of strings');
    });
  });

  describe('match', () => {
    const items = ['0model', '101-es6', '101-tomekwi', '12factor-log', '1337cat', '1password-manager', '27bslash6-module', '352-wascally', '3p', '42-cent-base', '42-cent-stripe', '4front-html-page-stream', '64bigint', '7z-stream', 'a', 'a-bit-of', 'a-construct-fn', 'a-csv', 'a-gulp-license', 'a-passport-ldap', 'a-server', 'a-test-package-for-registry-key', 'a2z', 'a_mock', 'aamva', 'ab-stringutil', 'abac-backend', 'abaco', 'abacus-eureka-plugin', 'abacus-eureka-stub', 'abacus-events', 'abacus-hystrix', 'abacus-partition', 'abagnale', 'abbrev-kindof', 'abbreviate', 'abcd', 'abcdefghijklmnopqrstuvwxyz', 'abdero-fetcher', 'abe', 'abe-json-builder', 'abee', 'abn-validator', 'abnacn-validator', 'abq', 'abraxas', 'abridge', 'absolute', 'absolute-json-improved-templating', 'abstract', 'abstract-a', 'abstract-bitcoin-wallet', 'abstract-blob-store', 'abstract-chunk-store', 'abstract-chunk-transport', 'abstract-class-harmony', 'abstract-classes', 'abstract-command', 'abstract-common-blockchain', 'abstract-common-wallet', 'abstract-connection', 'abstract-data', 'abstract-data-types', 'abstract-date', 'abstract-definer', 'abstract-document-builder', 'abstract-env', 'abstract-error', 'abstract-factory', 'abstract-file', 'abstract-fs', 'abstract-function', 'abstract-interface', 'abstract-ipc', 'abstract-iterator', 'abstract-leveldown', 'abstract-logger', 'abstract-mapper', 'abstract-nosql', 'abstract-numbering', 'abstract-object', 'abstract-peer-routing', 'abstract-pool', 'abstract-pull-git-repo', 'abstract-record-store', 'abstract-search', 'abstract-set', 'abstract-skiff-persistence', 'abstract-skiff-transport', 'abstract-socket', 'abstract-sql-compiler', 'abstract-state-router', 'abstract-storage', 'abstract-store', 'abstract-stream', 'abstract-stream-leveldown', 'abstract-stream-muxer', 'abstract-transport', 'abstract-type', 'abstractfs', 'abstractsocket', 'abstral', 'abstrap', 'abstruse', 'absu', 'accela-construct', 'accord-parallel', 'account', 'accoutrement-fonts', 'accoutrement-queries', 'accoutrement-strings', 'accum', 'accum-transform', 'accumulate', 'accumulate-values', 'achilles', 'ackmate-parser', 'acme', 'acorn-extract-comments', 'acorn-strip-comments', 'acr-backstrech', 'acr-backstretch', 'actimony', 'actinium', 'action-graph', 'action-mailer', 'action-stream', 'active-document', 'active-job', 'active-x-obfuscator', 'activenode-monitor', 'activity-mocks', 'activity-phraser', 'activity-strata', 'activity-streams', 'activity-streams-mongoose', 'activitystrea.ms', 'activitystreams', 'activitystreams-context', 'activitystreams-gh', 'actorify', 'adamant', 'adamvr-meteor-random', 'adapt-learn', 'adaptor', 'add-affiliate-querystring', 'add-banner', 'add-class', 'add-ellipsis', 'add-ender', 'add-flash', 'add-line-numbers', 'add-prop-stream', 'add-props-stream', 'add-stream', 'add-use-strict', 'addr-to-ip-port', 'address-deduplicator-stream', 'address-normalizer', 'address-validator', 'addressit', 'addui-store', 'adfs-strategy', 'adhoc-stream', 'adhocsrv', 'administrate', 'administrator', 'adminplus', 'admiral-cli', 'admiraljs', 'adobe-live-stream-connector', 'adq', 'adrian', 'adstream-adbank-api-generate-hash', 'adstream-data', 'adt-queue', 'adts', 'adtstream', 'advance', 'advanced-queue', 'advk', 'aedes', 'aedes-cached-persistence', 'aedes-packet', 'aedes-persistence', 'aedilis-passport', 'aegis', 'aerospike-leveldown', 'aes-gcm-stream', 'aether', 'afatbud', 'afd', 'affinage', 'afs', 'after-effects', 'ag-combobox', 'ag-packer', 'ag-types', 'agco-event-source-stream', 'age', 'age-cache', 'agg-session-manager', 'aggregate-stream', 'aggsy', 'agni-gen', 'ags-stream', 'aho-corasick', 'aho-corasick-automaton', 'ahr', 'ahr.browser', 'ahr.browser.jsonp', 'ahr.browser.request', 'ahr.node', 'ahr.options', 'ahr.utils', 'ahr2', 'aigis', 'aik', 'ainm', 'ainojs-html', 'aiota-register', 'aiota-stream', 'airplay-photos', 'airscore', 'airtunes', 'airtunes2mqtt', 'aisvg2sprite', 'aitch', 'ajax-abstraction', 'ajax-best-promise', 'ajax-bootstrap-select', 'ajfabriq', 'ajson', 'akamai-edgescape-parser', 'akashacms-theme-boilerplate', 'akashacms-theme-bootstrap', 'akashic', 'akostream', 'akta-ngbp', 'alac2pcm', 'alamid-api', 'alamo', 'albert', 'alcazar', 'alerts', 'aleut.objects.layout', 'alex1712-react-bootstrap-datetimepicker', 'alexa-utterances', 'alg-js', 'algebra-group', 'algebra-ring', 'algebra.laws', 'algebra.pointfree', 'algebra.structures', 'algebra.structures.all', 'algebra.structures.any', 'algebra.structures.constructor', 'algebra.structures.identity', 'algebra.structures.max', 'algebra.structures.min', 'algebra.structures.product', 'algebra.structures.sum', 'algeria', 'algo2', 'algojs', 'algojs-collections', 'algorithm', 'algorithm-js', 'algorithmic', 'algorithmjs', 'algorithms', 'algorithms.coffee', 'algorithms.js', 'alias-registry', 'alias-sampling', 'alice', 'align-text', 'aligner', 'alinex-config', 'alinex-database', 'alinex-util', 'alinex-validator', 'aliyun-oss-upload-stream', 'aljebra', 'all-args-stringified', 'all-args-to-string', 'all-doer', 'all-match', 'all-stream', 'all-structures', 'alldata', 'allmuz', 'allnpm', 'alonso-counter', 'alonso-follower', 'alonso-harvester', 'alpaca', 'alpha-complex', 'alpha-inc', 'alpha-js', 'alpha-sort', 'alphabet', 'alphabetize', 'alphabot', 'alphabot-component', 'alphanumeric', 'altair.io', 'alter', 'altstrade', 'always-generator', 'always-promise', 'alzheimer', 'am-winston-remote', 'amalgamate', 'amazeui-switch', 'amazon', 'amazon-review-stream'];

    it('should return an array of ResultItem', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance.match('s')).to.be.instanceof(Array);
      expect(fuzzInstance.match('s').meta[0]).to.be.instanceof(ResultItem);
    });

    it('should give the same result if used with cached results', () => {
      const fuzz1 = new Fuzz(items);
      const fuzz2 = new Fuzz(items, { disableCache: true });

      const result1 = fuzz1.match('ab');
      const result2 = fuzz2.match('ab');
      const result3 = Fuzz.match('ab', items);

      expect(result1).to.be.deep.equal(result2);
      expect(result2).to.be.deep.equal(result3);
    });
  });
});
