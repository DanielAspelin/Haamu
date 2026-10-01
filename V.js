'use strict';

/**
 * Haamu V monolith.
 *
 * V1 vocabulary rule:
 * - singular uppercase members are classes;
 * - plural uppercase members are dynamic arrays when their names do not conflict;
 * - members are parallel within V1 unless an explicit relationship is established.
 */
class V2 {
  static NAME = 'Haamu V2';
  static VERSION = '2';
  static STATE = 'under-construction';
}

class V1 {
  static NAME = 'Haamu V1';
  static VERSION = '1.0.0';
  static STATE = 'under-construction';

  static RUNTIME = class RUNTIME {};
  static RUNTIMES = [];

  static IO = class IO {};
  static IOS = [];

  static PLATFORM = class PLATFORM {};
  static PLATFORMS = [];

  static BROWSER = class BROWSER {};
  static BROWSERS = [];

  static WEB = class WEB {};
  static WEBS = [];

  static SYSTEM = class SYSTEM {};
  static SYSTEMS = [];

  static WORKER = class WORKER {};
  static WORKERS = [];

  static KIT = class KIT {};
  static KITS = [];

  static PROGRAM = class PROGRAM {};
  static PROGRAMS = [];

  static APPLICATION = class APPLICATION {};
  static APPLICATIONS = [];

  static GENERATOR = class GENERATOR {};
  static GENERATORS = [];

  static AUTOMATOR = class AUTOMATOR {};
  static AUTOMATORS = [];

  static TOOL = class TOOL {};
  static TOOLS = [];

  static PLATE = class PLATE {};
  static PLATES = [];

  static MATRIX = class MATRIX {};
  static MATRIXES = [];

  static GRID = class GRID {};
  static GRIDS = [];

  static MESH = class MESH {};
  static MESHES = [];

  static MENU = class MENU {};
  static MENUS = [];

  static PAGE = class PAGE {};
  static PAGES = [];

  static VIEW = class VIEW {};
  static VIEWS = [];

  static PANE = class PANE {};
  static PANES = [];

  static PANEL = class PANEL {};
  static PANELS = [];

  static BAR = class BAR {};
  static BARS = [];

  static BUTTON = class BUTTON {};
  static BUTTONS = [];

  static SHELL = class SHELL {};
  static SHELLS = [];

  static TERMINAL = class TERMINAL {};
  static TERMINALS = [];

  static CONSOLE = class CONSOLE {};
  static CONSOLES = [];

  static TEXT = class TEXT {};
  static TEXTS = [];

  static AUDIO = class AUDIO {};
  static AUDIOS = [];

  static VIDEO = class VIDEO {};
  static VIDEOS = [];

  static MEDIA = class MEDIA {};
  static MEDIAS = [];

  static MULTIMEDIA = class MULTIMEDIA {};
  static MULTIMEDIAS = [];

  static VECTOR = class VECTOR {};
  static VECTORS = [];

  static BLOCK = class BLOCK {};
  static BLOCKS = [];

  static LINE = class LINE {};
  static LINES = [];

  static SCRIPT = class SCRIPT {};
  static SCRIPTS = [];

  static BINARY = class BINARY {};
  static BINARIES = [];

  static PROCESSOR = class PROCESSOR {};
  static PROCESSORS = [];

  static ALLOCATOR = class ALLOCATOR {};
  static ALLOCATORS = [];

  static REALLOCATOR = class REALLOCATOR {};
  static REALLOCATORS = [];

  static DEALLOCATOR = class DEALLOCATOR {};
  static DEALLOCATORS = [];

  static READER = class READER {};
  static READERS = [];

  static WRITER = class WRITER {};
  static WRITERS = [];

  static RENDERER = class RENDERER {};
  static RENDERERS = [];

  static INTERPRETER = class INTERPRETER {};
  static INTERPRETERS = [];

  static PARSER = class PARSER {};
  static PARSERS = [];

  static SCHEDULER = class SCHEDULER {};
  static SCHEDULERS = [];

  static SYNCHRONIZER = class SYNCHRONIZER {};
  static SYNCHRONIZERS = [];

  static PARALLELIZER = class PARALLELIZER {};
  static PARALLELIZERS = [];

  static CONCURRENCER = class CONCURRENCER {};
  static CONCURRENCERS = [];

  static REGULATOR = class REGULATOR {};
  static REGULATORS = [];

  static CONTROLLER = class CONTROLLER {};
  static CONTROLLERS = [];

  static ADAPTER = class ADAPTER {};
  static ADAPTERS = [];

  static SENSOR = class SENSOR {};
  static SENSORS = [];

  static INITIALIZER = class INITIALIZER {};
  static INITIALIZERS = [];

  static DETECTOR = class DETECTOR {};
  static DETECTORS = [];

  static LOADER = class LOADER {};
  static LOADERS = [];

  static VALIDATOR = class VALIDATOR {};
  static VALIDATORS = [];

  static VERIFIER = class VERIFIER {};
  static VERIFIERS = [];

  static QUALIFIER = class QUALIFIER {};
  static QUALIFIERS = [];

  static QUANTIFIER = class QUANTIFIER {};
  static QUANTIFIERS = [];

  static REPLICATOR = class REPLICATOR {};
  static REPLICATORS = [];

  static BROADCASTER = class BROADCASTER {};
  static BROADCASTERS = [];

  static STREAMER = class STREAMER {};
  static STREAMERS = [];

  static BUILDER = class BUILDER {};
  static BUILDERS = [];

  static REBUILDER = class REBUILDER {};
  static REBUILDERS = [];

  static CONSTRUCTOR = class CONSTRUCTOR {};
  static CONSTRUCTORS = [];

  static DESTRUCTOR = class DESTRUCTOR {};
  static DESTRUCTORS = [];

  static CALLER = class CALLER {};
  static CALLERS = [];

  static RETURNER = class RETURNER {};
  static RETURNERS = [];

  static EXECUTOR = class EXECUTOR {};
  static EXECUTORS = [];

  static LOOPER = class LOOPER {};
  static LOOPERS = [];

  static PROCESS = class PROCESS {};
  static PROCESSES = [];

  static ALLOCATION = class ALLOCATION {};
  static ALLOCATIONS = [];

  static PROCESSING = class PROCESSING {};
  static PROCESSINGS = [];

  static SCHEDULING = class SCHEDULING {};
  static SCHEDULINGS = [];

  static CONCURRENCY = class CONCURRENCY {};
  static CONCURRENCIES = [];

  static PARALLELISM = class PARALLELISM {};
  static PARALLELISMS = [];

  static PERSISTENCE = class PERSISTENCE {};
  static PERSISTENCES = [];

  static CACHING = class CACHING {};
  static CACHINGS = [];

  static DELIVERY = class DELIVERY {};
  static DELIVERIES = [];

  static ASSEMBLY = class ASSEMBLY {};
  static ASSEMBLIES = [];

  static SNAPPING = class SNAPPING {};
  static SNAPPINGS = [];

  static MORPHING = class MORPHING {};
  static MORPHINGS = [];

  static NAVIGATION = class NAVIGATION {};
  static NAVIGATIONS = [];

  static SEARCH = class SEARCH {};
  static SEARCHES = [];

  static COMMUNICATION = class COMMUNICATION {};
  static COMMUNICATIONS = [];

  static CONNECTION = class CONNECTION {};
  static CONNECTIONS = [];

  static LOCATION = class LOCATION {};
  static LOCATIONS = [];

  static CRYPT = class CRYPT {};
  static CRYPTS = [];

  static ENCRYPTION = class ENCRYPTION {};
  static ENCRYPTIONS = [];

  static ENCODING = class ENCODING {};
  static ENCODINGS = [];

  static IDENTITY = class IDENTITY {};
  static IDENTITIES = [];

  static SESSION = class SESSION {};
  static SESSIONS = [];

  static TOKEN = class TOKEN {};
  static TOKENS = [];

  static UUID = class UUID {};
  static UUIDS = [];

  static NUMBER = class NUMBER {};
  static NUMBERS = [];

  static DNS = class DNS {};
  static DNSES = [];

  static DHCP = class DHCP {};
  static DHCPS = [];

  static VPN = class VPN {};
  static VPNS = [];

  static IP = class IP {};
  static IPS = [];

  static TCP = class TCP {};
  static TCPS = [];

  static UDP = class UDP {};
  static UDPS = [];

  static NAT = class NAT {};
  static NATS = [];

  static NIC = class NIC {};
  static NICS = [];

  static LAN = class LAN {};
  static LANS = [];

  static WAN = class WAN {};
  static WANS = [];

  static ROUTER = class ROUTER {};
  static ROUTERS = [];

  static SWITCH = class SWITCH {};
  static SWITCHES = [];

  static FIREWALL = class FIREWALL {};
  static FIREWALLS = [];

  static PROXY = class PROXY {};
  static PROXIES = [];

  static ANTIVIRUS = class ANTIVIRUS {};
  static ANTIVIRUSES = [];

  static NETWORK = class NETWORK {};
  static NETWORKS = [];

  static SCANNER = class SCANNER {};
  static SCANNERS = [];

  static MAPPER = class MAPPER {};
  static MAPPERS = [];

  static DISCOVERY = class DISCOVERY {};
  static DISCOVERIES = [];

  static INTERRUPT = class INTERRUPT {};
  static INTERRUPTS = [];

  static API = class API {};
  static APIS = [];

  static PLUGIN = class PLUGIN {};
  static PLUGINS = [];

  static PLUG = class PLUG {};
  static PLUGS = [];

  static SOCKET = class SOCKET {};
  static SOCKETS = [];

  static WIRE = class WIRE {};
  static WIRES = [];

  static WIRING = class WIRING {};
  static WIRINGS = [];

  static GROUP = class GROUP {};
  static GROUPS = [];

  static GROUPING = class GROUPING {};
  static GROUPINGS = [];

  static GROUPER = class GROUPER {};
  static GROUPERS = [];

  static CLASS = class CLASS {};
  static CLASSES = [];

  static REGISTRY = class REGISTRY {};
  static REGISTRIES = [];

  static REGISTRAR = class REGISTRAR {};
  static REGISTRARS = [];

  static LOGGER = class LOGGER {};
  static LOGGERS = [];

  static REPORTER = class REPORTER {};
  static REPORTERS = [];

  static TRANSACTOR = class TRANSACTOR {};
  static TRANSACTORS = [];

  static PROJECT = class PROJECT {};
  static PROJECTS = [];

  static MANAGER = class MANAGER {};
  static MANAGERS = [];

  static ARCHIVE = class ARCHIVE {};
  static ARCHIVES = [];

  static ZIP = class ZIP {};
  static ZIPS = [];

  static SNAPSHOT = class SNAPSHOT {};
  static SNAPSHOTS = [];

  static CHECKPOINT = class CHECKPOINT {};
  static CHECKPOINTS = [];

  static KNOWLEDGE = class KNOWLEDGE {};
  static KNOWLEDGES = [];

  static DATABASE = class DATABASE {};
  static DATABASES = [];

  static TABLE = class TABLE {};
  static TABLES = [];

  static SHEET = class SHEET {};
  static SHEETS = [];

  static ROW = class ROW {};
  static ROWS = [];

  static COLUMN = class COLUMN {};
  static COLUMNS = [];

  static CELL = class CELL {};
  static CELLS = [];

  static TUPLE = class TUPLE {};
  static TUPLES = [];

  static HEADER = class HEADER {};
  static HEADERS = [];

  static CAPABILITY = class CAPABILITY {};
  static CAPABILITIES = [];

  static SELECTION = class SELECTION {};
  static SELECTIONS = [];

  static ARITHMETIC = class ARITHMETIC {};
  static ARITHMETICS = [];

  static ICON = class ICON {};
  static ICONS = [];

  static SCOPE = class SCOPE {};
  static SCOPES = [];

  static ZONE = class ZONE {};
  static ZONES = [];

  static REGION = class REGION {};
  static REGIONS = [];

  static AREA = class AREA {};
  static AREAS = [];

  static ENVIRONMENT = class ENVIRONMENT {};
  static ENVIRONMENTS = [];

  static FACTORY = class FACTORY {};
  static FACTORIES = [];

  static INDUSTRY = class INDUSTRY {};
  static INDUSTRIES = [];

  static MANUFACTURING = class MANUFACTURING {};
  static MANUFACTURINGS = [];

  static PRODUCTION = class PRODUCTION {};
  static PRODUCTIONS = [];

  static TRANSFER = class TRANSFER {};
  static TRANSFERS = [];

  static SOURCE = class SOURCE {};
  static SOURCES = [];

  static TARGET = class TARGET {};
  static TARGETS = [];

  static SIMULATION = class SIMULATION {};
  static SIMULATIONS = [];

  static CAD = class CAD {};
  static CADS = [];

  static INTERFACE = class INTERFACE {};
  static INTERFACES = [];

  static FEATURE = class FEATURE {};
  static FEATURES = [];

  static INTERPRETATION = class INTERPRETATION {};
  static INTERPRETATIONS = [];

  static MUTATION = class MUTATION {};
  static MUTATIONS = [];

  static LIFECYCLE = class LIFECYCLE {};
  static LIFECYCLES = [];

  static ENTITY = class ENTITY {};
  static ENTITIES = [];

  static ARCHITECTURE = class ARCHITECTURE {};
  static ARCHITECTURES = [];

  static NATIVE = class NATIVE {};
  static NATIVES = [];

  static VIRTUAL = class VIRTUAL {};
  static VIRTUALS = [];

  static EMULATION = class EMULATION {};
  static EMULATIONS = [];

  static HYPERVISOR = class HYPERVISOR {};
  static HYPERVISORS = [];

  static KVM = class KVM {};
  static KVMS = [];

  static QEMU = class QEMU {};
  static QEMUS = [];

  static VM = class VM {};
  static VMS = [];

  static CONTAINER = class CONTAINER {};
  static CONTAINERS = [];

  static CONTAINERIZATION = class CONTAINERIZATION {};
  static CONTAINERIZATIONS = [];

  static INTERCONNECTION = class INTERCONNECTION {};
  static INTERCONNECTIONS = [];

  static INTERCOMMUNICATION = class INTERCOMMUNICATION {};
  static INTERCOMMUNICATIONS = [];

  static NEGOTIATION = class NEGOTIATION {};
  static NEGOTIATIONS = [];

  static RFC = class RFC {};
  static RFCS = [];

  static DATA = class DATA {};
  static DATAS = [];

  static INVOCATION = class INVOCATION {};
  static INVOCATIONS = [];

  static EXECUTION = class EXECUTION {};
  static EXECUTIONS = [];

  static LOADING = class LOADING {};
  static LOADINGS = [];

  static INSTANTIATION = class INSTANTIATION {};
  static INSTANTIATIONS = [];

  static INITIALIZATION = class INITIALIZATION {};
  static INITIALIZATIONS = [];

  static TYPE = class TYPE {};
  static TYPES = [];

  static MODE = class MODE {};
  static MODES = [];

  static CONDITION = class CONDITION {};
  static CONDITIONS = [];

  static STATE = class STATE {};
  static STATES = [];

  static GOAL = class GOAL {};
  static GOALS = [];

  static PROPHECY = class PROPHECY {};
  static PROPHECIES = [];

  static PREDICTION = class PREDICTION {};
  static PREDICTIONS = [];

  static POSITION = class POSITION {};
  static POSITIONS = [];

  static WEATHER = class WEATHER {};
  static WEATHERS = [];

  static FORECAST = class FORECAST {};
  static FORECASTS = [];

  static NEWS = class NEWS {};
  static NEWSES = [];

  static PODCAST = class PODCAST {};
  static PODCASTS = [];

  static RADIO = class RADIO {};
  static RADIOS = [];

  static MESSAGING = class MESSAGING {};
  static MESSAGINGS = [];

  static MESSENGER = class MESSENGER {};
  static MESSENGERS = [];

  static COMMENT = class COMMENT {};
  static COMMENTS = [];

  static NOTATION = class NOTATION {};
  static NOTATIONS = [];

  static FORENSICS = class FORENSICS {};
  static FORENSICSES = [];

  static AGENT = class AGENT {};
  static AGENTS = [];

  static PARENT = class PARENT {};
  static PARENTS = [];

  static CHILD = class CHILD {};
  static CHILDREN = [];

  static SIBLING = class SIBLING {};
  static SIBLINGS = [];

  static MINING = class MINING {};
  static MININGS = [];

  static BOT = class BOT {};
  static BOTS = [];

  static CLASSIFICATION = class CLASSIFICATION {};
  static CLASSIFICATIONS = [];

  static PHYLUM = class PHYLUM {};
  static PHYLA = [];

  static ORDER = class ORDER {};
  static ORDERS = [];

  static BROADCAST = class BROADCAST {};
  static BROADCASTS = [];

  static STREAM = class STREAM {};
  static STREAMS = [];

  static TRANSMISSION = class TRANSMISSION {};
  static TRANSMISSIONS = [];

  static TRANSCEIVER = class TRANSCEIVER {};
  static TRANSCEIVERS = [];

  static RECEIVER = class RECEIVER {};
  static RECEIVERS = [];

  static SENDER = class SENDER {};
  static SENDERS = [];

  static LAW = class LAW {};
  static LAWS = [];

  static RULE = class RULE {};
  static RULES = [];

  static REGULATION = class REGULATION {};
  static REGULATIONS = [];

  static EDUCATION = class EDUCATION {};
  static EDUCATIONS = [];

  static TEACHER = class TEACHER {};
  static TEACHERS = [];

  static STUDENT = class STUDENT {};
  static STUDENTS = [];

  static SUBSYSTEM = class SUBSYSTEM {};
  static SUBSYSTEMS = [];

  static SUBSHELL = class SUBSHELL {};
  static SUBSHELLS = [];

  static BOOTSTRAP = class BOOTSTRAP {};
  static BOOTSTRAPS = [];

  static STATEMENT = class STATEMENT {};
  static STATEMENTS = [];

  static STATING = class STATING {};
  static STATINGS = [];

  static STATER = class STATER {};
  static STATERS = [];

  static GENERATION = class GENERATION {};
  static GENERATIONS = [];

  static AUTOMATION = class AUTOMATION {};
  static AUTOMATIONS = [];

  static COMPUTER = class COMPUTER {};
  static COMPUTERS = [];

  static COMPUTATION = class COMPUTATION {};
  static COMPUTATIONS = [];

  static COMPUTE = class COMPUTE {};
  static COMPUTES = [];

  static ALGORITHM = class ALGORITHM {};
  static ALGORITHMS = [];

  static ALGORITHMICS = class ALGORITHMICS {};
  static ALGORITHMICSES = [];

  static LOGIC = class LOGIC {};
  static LOGICS = [];

  static BOOLEAN = class BOOLEAN {};
  static BOOLEANS = [];

  static BIT = class BIT {};
  static BITS = [];

  static BYTE = class BYTE {};
  static BYTES = [];

  static WORD = class WORD {};
  static WORDS = [];

  static NIBBLE = class NIBBLE {};
  static NIBBLES = [];

  static OCTET = class OCTET {};
  static OCTETS = [];

  static INTEGER = class INTEGER {};
  static INTEGERS = [];

  static FLOAT = class FLOAT {};
  static FLOATS = [];

  static DOUBLE = class DOUBLE {};
  static DOUBLES = [];

  static DECIMAL = class DECIMAL {};
  static DECIMALS = [];

  static SCALAR = class SCALAR {};
  static SCALARS = [];

  static CONSTANT = class CONSTANT {};
  static CONSTANTS = [];

  static VARIABLE = class VARIABLE {};
  static VARIABLES = [];

  static PARAMETER = class PARAMETER {};
  static PARAMETERS = [];

  static ARGUMENT = class ARGUMENT {};
  static ARGUMENTS = [];

  static OPERAND = class OPERAND {};
  static OPERANDS = [];

  static OPERATOR = class OPERATOR {};
  static OPERATORS = [];

  static EXPRESSION = class EXPRESSION {};
  static EXPRESSIONS = [];

  static FUNCTION = class FUNCTION {};
  static FUNCTIONS = [];

  static METHOD = class METHOD {};
  static METHODS = [];

  static PROCEDURE = class PROCEDURE {};
  static PROCEDURES = [];

  static ROUTINE = class ROUTINE {};
  static ROUTINES = [];

  static SUBROUTINE = class SUBROUTINE {};
  static SUBROUTINES = [];

  static CALLBACK = class CALLBACK {};
  static CALLBACKS = [];

  static CLOSURE = class CLOSURE {};
  static CLOSURES = [];

  static LAMBDA = class LAMBDA {};
  static LAMBDAS = [];

  static RECURSION = class RECURSION {};
  static RECURSIONS = [];

  static ITERATION = class ITERATION {};
  static ITERATIONS = [];

  static LOOP = class LOOP {};
  static LOOPS = [];

  static BRANCH = class BRANCH {};
  static BRANCHES = [];

  static JUMP = class JUMP {};
  static JUMPS = [];

  static LABEL = class LABEL {};
  static LABELS = [];

  static POINTER = class POINTER {};
  static POINTERS = [];

  static REFERENCE = class REFERENCE {};
  static REFERENCES = [];

  static ADDRESS = class ADDRESS {};
  static ADDRESSES = [];

  static OFFSET = class OFFSET {};
  static OFFSETS = [];

  static INDEX = class INDEX {};
  static INDICES = [];

  static CURSOR = class CURSOR {};
  static CURSORS = [];

  static BUFFER = class BUFFER {};
  static BUFFERS = [];

  static QUEUE = class QUEUE {};
  static QUEUES = [];

  static STACK = class STACK {};
  static STACKS = [];

  static HEAP = class HEAP {};
  static HEAPS = [];

  static DEQUE = class DEQUE {};
  static DEQUES = [];

  static LIST = class LIST {};
  static LISTS = [];

  static LINK = class LINK {};
  static LINKS = [];

  static NODE = class NODE {};
  static NODES = [];

  static TREE = class TREE {};
  static TREES = [];

  static GRAPH = class GRAPH {};
  static GRAPHS = [];

  static EDGE = class EDGE {};
  static EDGES = [];

  static VERTEX = class VERTEX {};
  static VERTICES = [];

  static HASH = class HASH {};
  static HASHES = [];

  static MAP = class MAP {};
  static MAPS = [];

  static SET = class SET {};
  static SETS = [];

  static ARRAY = class ARRAY {};
  static ARRAYS = [];

  static RECORD = class RECORD {};
  static RECORDS = [];

  static STRUCTURE = class STRUCTURE {};
  static STRUCTURES = [];

  static UNION = class UNION {};
  static UNIONS = [];

  static ENUMERATION = class ENUMERATION {};
  static ENUMERATIONS = [];

  static TEMPLATE = class TEMPLATE {};
  static TEMPLATES = [];

  static GENERIC = class GENERIC {};
  static GENERICS = [];

  static TRAIT = class TRAIT {};
  static TRAITS = [];

  static PROTOCOL = class PROTOCOL {};
  static PROTOCOLS = [];

  static CONTRACT = class CONTRACT {};
  static CONTRACTS = [];

  static SCHEMA = class SCHEMA {};
  static SCHEMAS = [];

  static MODEL = class MODEL {};
  static MODELS = [];

  static OBJECT = class OBJECT {};
  static OBJECTS = [];

  static INSTANCE = class INSTANCE {};
  static INSTANCES = [];

  static PROPERTY = class PROPERTY {};
  static PROPERTIES = [];

  static ATTRIBUTE = class ATTRIBUTE {};
  static ATTRIBUTES = [];

  static FIELD = class FIELD {};
  static FIELDS = [];

  static MEMBER = class MEMBER {};
  static MEMBERS = [];

  static EVENT = class EVENT {};
  static EVENTS = [];

  static SIGNAL = class SIGNAL {};
  static SIGNALS = [];

  static SLOT = class SLOT {};
  static SLOTS = [];

  static HOOK = class HOOK {};
  static HOOKS = [];

  static HANDLER = class HANDLER {};
  static HANDLERS = [];

  static DISPATCH = class DISPATCH {};
  static DISPATCHES = [];

  static DISPATCHER = class DISPATCHER {};
  static DISPATCHERS = [];

  static ROUTING = class ROUTING {};
  static ROUTINGS = [];

  static ROUTE = class ROUTE {};
  static ROUTES = [];

  static CHANNEL = class CHANNEL {};
  static CHANNELS = [];

  static PIPE = class PIPE {};
  static PIPES = [];

  static PIPELINE = class PIPELINE {};
  static PIPELINES = [];

  static FILTER = class FILTER {};
  static FILTERS = [];

  static REDUCER = class REDUCER {};
  static REDUCERS = [];

  static ITERATOR = class ITERATOR {};
  static ITERATORS = [];

  static ITERABLE = class ITERABLE {};
  static ITERABLES = [];

  static COROUTINE = class COROUTINE {};
  static COROUTINES = [];

  static FIBER = class FIBER {};
  static FIBERS = [];

  static THREAD = class THREAD {};
  static THREADS = [];

  static TASK = class TASK {};
  static TASKS = [];

  static JOB = class JOB {};
  static JOBS = [];

  static KERNEL = class KERNEL {};
  static KERNELS = [];

  static MICROKERNEL = class MICROKERNEL {};
  static MICROKERNELS = [];

  static CLOCK = class CLOCK {};
  static CLOCKS = [];

  static TIMER = class TIMER {};
  static TIMERS = [];

  static TICK = class TICK {};
  static TICKS = [];

  static EPOCH = class EPOCH {};
  static EPOCHES = [];

  static CYCLE = class CYCLE {};
  static CYCLES = [];

  static INSTRUCTION = class INSTRUCTION {};
  static INSTRUCTIONS = [];

  static OPCODE = class OPCODE {};
  static OPCODES = [];

  static REGISTER = class REGISTER {};
  static REGISTERS = [];

  static CACHE = class CACHE {};
  static CACHES = [];

  static MEMORY = class MEMORY {};
  static MEMORIES = [];

  static RAM = class RAM {};
  static RAMS = [];

  static ROM = class ROM {};
  static ROMS = [];

  static SRAM = class SRAM {};
  static SRAMS = [];

  static DRAM = class DRAM {};
  static DRAMS = [];

  static VRAM = class VRAM {};
  static VRAMS = [];

  static NVRAM = class NVRAM {};
  static NVRAMS = [];

  static STORAGE = class STORAGE {};
  static STORAGES = [];

  static DISK = class DISK {};
  static DISKS = [];

  static DRIVE = class DRIVE {};
  static DRIVES = [];

  static VOLUME = class VOLUME {};
  static VOLUMES = [];

  static PARTITION = class PARTITION {};
  static PARTITIONS = [];

  static SECTOR = class SECTOR {};
  static SECTORS = [];

  static FRAME = class FRAME {};
  static FRAMES = [];

  static SWAP = class SWAP {};
  static SWAPS = [];

  static BUS = class BUS {};
  static BUSES = [];

  static PORT = class PORT {};
  static PORTS = [];

  static BRIDGE = class BRIDGE {};
  static BRIDGES = [];

  static GATE = class GATE {};
  static GATES = [];

  static GATEWAY = class GATEWAY {};
  static GATEWAYS = [];

  static CHIP = class CHIP {};
  static CHIPS = [];

  static CHIPSET = class CHIPSET {};
  static CHIPSETS = [];

  static CPU = class CPU {};
  static CPUS = [];

  static GPU = class GPU {};
  static GPUS = [];

  static NPU = class NPU {};
  static NPUS = [];

  static TPU = class TPU {};
  static TPUS = [];

  static ALU = class ALU {};
  static ALUS = [];

  static FPU = class FPU {};
  static FPUS = [];

  static SIMD = class SIMD {};
  static SIMDS = [];

  static MIMD = class MIMD {};
  static MIMDS = [];

  static ISA = class ISA {};
  static ISAS = [];

  static MICROCODE = class MICROCODE {};
  static MICROCODES = [];

  static FIRMWARE = class FIRMWARE {};
  static FIRMWARES = [];

  static BOOTLOADER = class BOOTLOADER {};
  static BOOTLOADERS = [];

  static BIOS = class BIOS {};
  static BIOSES = [];

  static UEFI = class UEFI {};
  static UEFIS = [];

  static IRQ = class IRQ {};
  static IRQS = [];

  static DMA = class DMA {};
  static DMAS = [];

  static MMU = class MMU {};
  static MMUS = [];

  static TLB = class TLB {};
  static TLBS = [];

  static NUMA = class NUMA {};
  static NUMAS = [];

  static CORE = class CORE {};
  static CORES = [];

  static TOPOLOGY = class TOPOLOGY {};
  static TOPOLOGIES = [];

  static BANDWIDTH = class BANDWIDTH {};
  static BANDWIDTHS = [];

  static LATENCY = class LATENCY {};
  static LATENCIES = [];

  static THROUGHPUT = class THROUGHPUT {};
  static THROUGHPUTS = [];

  static CAPACITY = class CAPACITY {};
  static CAPACITIES = [];

  static UTILIZATION = class UTILIZATION {};
  static UTILIZATIONS = [];

  static LOAD = class LOAD {};
  static LOADS = [];

  static PRIORITY = class PRIORITY {};
  static PRIORITIES = [];

  static AFFINITY = class AFFINITY {};
  static AFFINITIES = [];

  static MUTEX = class MUTEX {};
  static MUTEXES = [];

  static SEMAPHORE = class SEMAPHORE {};
  static SEMAPHORES = [];

  static LOCK = class LOCK {};
  static LOCKS = [];

  static LATCH = class LATCH {};
  static LATCHES = [];

  static BARRIER = class BARRIER {};
  static BARRIERS = [];

  static ATOMIC = class ATOMIC {};
  static ATOMICS = [];

  static TRANSACTION = class TRANSACTION {};
  static TRANSACTIONS = [];

  static COMMIT = class COMMIT {};
  static COMMITS = [];

  static ROLLBACK = class ROLLBACK {};
  static ROLLBACKS = [];

  static CONSENSUS = class CONSENSUS {};
  static CONSENSUSES = [];

  static QUORUM = class QUORUM {};
  static QUORUMS = [];

  static LEADER = class LEADER {};
  static LEADERS = [];

  static FOLLOWER = class FOLLOWER {};
  static FOLLOWERS = [];

  static REPLICA = class REPLICA {};
  static REPLICAS = [];

  static SHARD = class SHARD {};
  static SHARDS = [];

  static PARTITIONING = class PARTITIONING {};
  static PARTITIONINGS = [];

  static CLUSTER = class CLUSTER {};
  static CLUSTERS = [];

  static POOL = class POOL {};
  static POOLS = [];

  static FARM = class FARM {};
  static FARMS = [];

  static DISTRIBUTION = class DISTRIBUTION {};
  static DISTRIBUTIONS = [];

  static DISTRIBUTED = class DISTRIBUTED {};
  static DISTRIBUTEDS = [];

  static FEDERATION = class FEDERATION {};
  static FEDERATIONS = [];

  static COORDINATION = class COORDINATION {};
  static COORDINATIONS = [];

  static ORCHESTRATION = class ORCHESTRATION {};
  static ORCHESTRATIONS = [];

  static BALANCER = class BALANCER {};
  static BALANCERS = [];

  static BROKER = class BROKER {};
  static BROKERS = [];

  static QUEUING = class QUEUING {};
  static QUEUINGS = [];

  static MESSAGE = class MESSAGE {};
  static MESSAGES = [];

  static PACKET = class PACKET {};
  static PACKETS = [];

  static DATAGRAM = class DATAGRAM {};
  static DATAGRAMS = [];

  static SEGMENT = class SEGMENT {};
  static SEGMENTS = [];

  static FLOW = class FLOW {};
  static FLOWS = [];

  static TRAFFIC = class TRAFFIC {};
  static TRAFFICS = [];

  static ENDPOINT = class ENDPOINT {};
  static ENDPOINTS = [];

  static HOST = class HOST {};
  static HOSTS = [];

  static CLIENT = class CLIENT {};
  static CLIENTS = [];

  static SERVER = class SERVER {};
  static SERVERS = [];

  static PEER = class PEER {};
  static PEERS = [];

  static TUNNEL = class TUNNEL {};
  static TUNNELS = [];

  static VLAN = class VLAN {};
  static VLANS = [];

  static WLAN = class WLAN {};
  static WLANS = [];

  static PAN = class PAN {};
  static PANS = [];

  static SAN = class SAN {};
  static SANS = [];

  static SUBNET = class SUBNET {};
  static SUBNETS = [];

  static NETMASK = class NETMASK {};
  static NETMASKS = [];

  static PREFIX = class PREFIX {};
  static PREFIXES = [];

  static BGP = class BGP {};
  static BGPS = [];

  static OSPF = class OSPF {};
  static OSPFS = [];

  static ARP = class ARP {};
  static ARPS = [];

  static ICMP = class ICMP {};
  static ICMPS = [];

  static HTTP = class HTTP {};
  static HTTPS = [];

  static QUIC = class QUIC {};
  static QUICS = [];

  static TLS = class TLS {};
  static TLSES = [];

  static SSL = class SSL {};
  static SSLS = [];

  static SSH = class SSH {};
  static SSHES = [];

  static FTP = class FTP {};
  static FTPS = [];

  static SFTP = class SFTP {};
  static SFTPS = [];

  static SMTP = class SMTP {};
  static SMTPS = [];

  static IMAP = class IMAP {};
  static IMAPS = [];

  static POP = class POP {};
  static POPS = [];

  static WEBSOCKET = class WEBSOCKET {};
  static WEBSOCKETS = [];

  static WEBRTC = class WEBRTC {};
  static WEBRTCS = [];

  static MQTT = class MQTT {};
  static MQTTS = [];

  static AMQP = class AMQP {};
  static AMQPS = [];

  static RPC = class RPC {};
  static RPCS = [];

  static GRPC = class GRPC {};
  static GRPCS = [];

  static REST = class REST {};
  static RESTS = [];

  static GRAPHQL = class GRAPHQL {};
  static GRAPHQLS = [];

  static SOAP = class SOAP {};
  static SOAPS = [];

  static JSON = class JSON {};
  static JSONS = [];

  static XML = class XML {};
  static XMLS = [];

  static YAML = class YAML {};
  static YAMLS = [];

  static TOML = class TOML {};
  static TOMLS = [];

  static CSV = class CSV {};
  static CSVS = [];

  static MIME = class MIME {};
  static MIMES = [];

  static URI = class URI {};
  static URIS = [];

  static URL = class URL {};
  static URLS = [];

  static URN = class URN {};
  static URNS = [];

  static DOMAIN = class DOMAIN {};
  static DOMAINS = [];

  static HOSTNAME = class HOSTNAME {};
  static HOSTNAMES = [];

  static HANDSHAKE = class HANDSHAKE {};
  static HANDSHAKES = [];

  static SERIALIZATION = class SERIALIZATION {};
  static SERIALIZATIONS = [];

  static DESERIALIZATION = class DESERIALIZATION {};
  static DESERIALIZATIONS = [];

  static MARSHAL = class MARSHAL {};
  static MARSHALS = [];

  static UNMARSHAL = class UNMARSHAL {};
  static UNMARSHALS = [];

  static ENCODER = class ENCODER {};
  static ENCODERS = [];

  static DECODER = class DECODER {};
  static DECODERS = [];

  static CODEC = class CODEC {};
  static CODECS = [];

  static COMPRESSION = class COMPRESSION {};
  static COMPRESSIONS = [];

  static DECOMPRESSION = class DECOMPRESSION {};
  static DECOMPRESSIONS = [];

  static ARCHIVER = class ARCHIVER {};
  static ARCHIVERS = [];

  static PACKAGER = class PACKAGER {};
  static PACKAGERS = [];

  static FORMAT = class FORMAT {};
  static FORMATS = [];

  static LEXER = class LEXER {};
  static LEXERS = [];

  static TOKENIZER = class TOKENIZER {};
  static TOKENIZERS = [];

  static AST = class AST {};
  static ASTS = [];

  static CST = class CST {};
  static CSTS = [];

  static GRAMMAR = class GRAMMAR {};
  static GRAMMARS = [];

  static SYNTAX = class SYNTAX {};
  static SYNTAXES = [];

  static SEMANTIC = class SEMANTIC {};
  static SEMANTICS = [];

  static PRAGMA = class PRAGMA {};
  static PRAGMAS = [];

  static DIRECTIVE = class DIRECTIVE {};
  static DIRECTIVES = [];

  static MACRO = class MACRO {};
  static MACROS = [];

  static PREPROCESSOR = class PREPROCESSOR {};
  static PREPROCESSORS = [];

  static COMPILER = class COMPILER {};
  static COMPILERS = [];

  static ASSEMBLER = class ASSEMBLER {};
  static ASSEMBLERS = [];

  static LINKER = class LINKER {};
  static LINKERS = [];

  static TRANSPILER = class TRANSPILER {};
  static TRANSPILERS = [];

  static BYTECODE = class BYTECODE {};
  static BYTECODES = [];

  static MACHINE = class MACHINE {};
  static MACHINES = [];

  static VIRTUALMACHINE = class VIRTUALMACHINE {};
  static VIRTUALMACHINES = [];

  static WASM = class WASM {};
  static WASMS = [];

  static WEBASSEMBLY = class WEBASSEMBLY {};
  static WEBASSEMBLIES = [];

  static LANGUAGE = class LANGUAGE {};
  static LANGUAGES = [];

  static DIALECT = class DIALECT {};
  static DIALECTS = [];

  static MODULE = class MODULE {};
  static MODULES = [];

  static PACKAGE = class PACKAGE {};
  static PACKAGES = [];

  static LIBRARY = class LIBRARY {};
  static LIBRARIES = [];

  static FRAMEWORK = class FRAMEWORK {};
  static FRAMEWORKS = [];

  static SDK = class SDK {};
  static SDKS = [];

  static ABI = class ABI {};
  static ABIS = [];

  static FFI = class FFI {};
  static FFIS = [];

  static BINDING = class BINDING {};
  static BINDINGS = [];

  static SYMBOL = class SYMBOL {};
  static SYMBOLS = [];

  static DEBUG = class DEBUG {};
  static DEBUGS = [];

  static DEBUGGER = class DEBUGGER {};
  static DEBUGGERS = [];

  static BREAKPOINT = class BREAKPOINT {};
  static BREAKPOINTS = [];

  static WATCHPOINT = class WATCHPOINT {};
  static WATCHPOINTS = [];

  static TRACE = class TRACE {};
  static TRACES = [];

  static TRACER = class TRACER {};
  static TRACERS = [];

  static PROFILER = class PROFILER {};
  static PROFILERS = [];

  static PROFILE = class PROFILE {};
  static PROFILES = [];

  static METRIC = class METRIC {};
  static METRICS = [];

  static MEASUREMENT = class MEASUREMENT {};
  static MEASUREMENTS = [];

  static COUNTER = class COUNTER {};
  static COUNTERS = [];

  static GAUGE = class GAUGE {};
  static GAUGES = [];

  static HISTOGRAM = class HISTOGRAM {};
  static HISTOGRAMS = [];

  static TELEMETRY = class TELEMETRY {};
  static TELEMETRIES = [];

  static OBSERVABILITY = class OBSERVABILITY {};
  static OBSERVABILITIES = [];

  static MONITOR = class MONITOR {};
  static MONITORS = [];

  static MONITORING = class MONITORING {};
  static MONITORINGS = [];

  static ALERT = class ALERT {};
  static ALERTS = [];

  static ALARM = class ALARM {};
  static ALARMS = [];

  static HEALTH = class HEALTH {};
  static HEALTHS = [];

  static HEARTBEAT = class HEARTBEAT {};
  static HEARTBEATS = [];

  static WATCHDOG = class WATCHDOG {};
  static WATCHDOGS = [];

  static LOG = class LOG {};
  static LOGS = [];

  static JOURNAL = class JOURNAL {};
  static JOURNALS = [];

  static REPORT = class REPORT {};
  static REPORTS = [];

  static AUDIT = class AUDIT {};
  static AUDITS = [];

  static DIAGNOSTIC = class DIAGNOSTIC {};
  static DIAGNOSTICS = [];

  static INSPECTION = class INSPECTION {};
  static INSPECTIONS = [];

  static ANALYSIS = class ANALYSIS {};
  static ANALYSES = [];

  static ANALYZER = class ANALYZER {};
  static ANALYZERS = [];

  static TEST = class TEST {};
  static TESTS = [];

  static TESTER = class TESTER {};
  static TESTERS = [];

  static FIXTURE = class FIXTURE {};
  static FIXTURES = [];

  static MOCK = class MOCK {};
  static MOCKS = [];

  static STUB = class STUB {};
  static STUBS = [];

  static HARNESS = class HARNESS {};
  static HARNESSES = [];

  static BENCHMARK = class BENCHMARK {};
  static BENCHMARKS = [];

  static FUZZER = class FUZZER {};
  static FUZZERS = [];

  static FUZZING = class FUZZING {};
  static FUZZINGS = [];

  static ASSERTION = class ASSERTION {};
  static ASSERTIONS = [];

  static EXPECTATION = class EXPECTATION {};
  static EXPECTATIONS = [];

  static SPECIFICATION = class SPECIFICATION {};
  static SPECIFICATIONS = [];

  static REQUIREMENT = class REQUIREMENT {};
  static REQUIREMENTS = [];

  static QUALIFICATION = class QUALIFICATION {};
  static QUALIFICATIONS = [];

  static VERIFICATION = class VERIFICATION {};
  static VERIFICATIONS = [];

  static VALIDATION = class VALIDATION {};
  static VALIDATIONS = [];

  static REGRESSION = class REGRESSION {};
  static REGRESSIONS = [];

  static COVERAGE = class COVERAGE {};
  static COVERAGES = [];

  static BUILD = class BUILD {};
  static BUILDS = [];

  static MAKE = class MAKE {};
  static MAKES = [];

  static CMAKE = class CMAKE {};
  static CMAKES = [];

  static NINJA = class NINJA {};
  static NINJAS = [];

  static ARTIFACT = class ARTIFACT {};
  static ARTIFACTS = [];

  static EXECUTABLE = class EXECUTABLE {};
  static EXECUTABLES = [];

  static RELEASE = class RELEASE {};
  static RELEASES = [];

  static DEPLOYMENT = class DEPLOYMENT {};
  static DEPLOYMENTS = [];

  static DEPLOYER = class DEPLOYER {};
  static DEPLOYERS = [];

  static PROVISIONING = class PROVISIONING {};
  static PROVISIONINGS = [];

  static PROVISIONER = class PROVISIONER {};
  static PROVISIONERS = [];

  static CONFIGURATION = class CONFIGURATION {};
  static CONFIGURATIONS = [];

  static CONFIGURATOR = class CONFIGURATOR {};
  static CONFIGURATORS = [];

  static INSTALLER = class INSTALLER {};
  static INSTALLERS = [];

  static UPDATE = class UPDATE {};
  static UPDATES = [];

  static PATCH = class PATCH {};
  static PATCHES = [];

  static MIGRATION = class MIGRATION {};
  static MIGRATIONS = [];

  static REVISION = class REVISION {};
  static REVISIONS = [];

  static TAG = class TAG {};
  static TAGS = [];

  static FORK = class FORK {};
  static FORKS = [];

  static MERGE = class MERGE {};
  static MERGES = [];

  static REBASE = class REBASE {};
  static REBASES = [];

  static DIFF = class DIFF {};
  static DIFFS = [];

  static CHANGESET = class CHANGESET {};
  static CHANGESETS = [];

  static REPOSITORY = class REPOSITORY {};
  static REPOSITORIES = [];

  static SOURCECODE = class SOURCECODE {};
  static SOURCECODES = [];

  static LICENSE = class LICENSE {};
  static LICENSES = [];

  static DEPENDENCY = class DEPENDENCY {};
  static DEPENDENCIES = [];

  static RESOLVER = class RESOLVER {};
  static RESOLVERS = [];

  static MANIFEST = class MANIFEST {};
  static MANIFESTS = [];

  static LOCKFILE = class LOCKFILE {};
  static LOCKFILES = [];

  static CHECKSUM = class CHECKSUM {};
  static CHECKSUMS = [];

  static DIGEST = class DIGEST {};
  static DIGESTS = [];

  static SIGNATURE = class SIGNATURE {};
  static SIGNATURES = [];

  static CERTIFICATE = class CERTIFICATE {};
  static CERTIFICATES = [];

  static KEY = class KEY {};
  static KEYS = [];

  static KEYSTORE = class KEYSTORE {};
  static KEYSTORES = [];

  static SECRET = class SECRET {};
  static SECRETS = [];

  static CREDENTIAL = class CREDENTIAL {};
  static CREDENTIALS = [];

  static AUTHENTICATION = class AUTHENTICATION {};
  static AUTHENTICATIONS = [];

  static AUTHORIZATION = class AUTHORIZATION {};
  static AUTHORIZATIONS = [];

  static PERMISSION = class PERMISSION {};
  static PERMISSIONS = [];

  static PRIVILEGE = class PRIVILEGE {};
  static PRIVILEGES = [];

  static ROLE = class ROLE {};
  static ROLES = [];

  static POLICY = class POLICY {};
  static POLICIES = [];

  static ACL = class ACL {};
  static ACLS = [];

  static RBAC = class RBAC {};
  static RBACS = [];

  static ABAC = class ABAC {};
  static ABACS = [];

  static PRINCIPAL = class PRINCIPAL {};
  static PRINCIPALS = [];

  static SUBJECT = class SUBJECT {};
  static SUBJECTS = [];

  static CLAIM = class CLAIM {};
  static CLAIMS = [];

  static NONCE = class NONCE {};
  static NONCES = [];

  static SALT = class SALT {};
  static SALTS = [];

  static ENTROPY = class ENTROPY {};
  static ENTROPIES = [];

  static RANDOM = class RANDOM {};
  static RANDOMS = [];

  static RNG = class RNG {};
  static RNGS = [];

  static CIPHER = class CIPHER {};
  static CIPHERS = [];

  static CRYPTOGRAPHY = class CRYPTOGRAPHY {};
  static CRYPTOGRAPHIES = [];

  static CRYPTOGRAPHER = class CRYPTOGRAPHER {};
  static CRYPTOGRAPHERS = [];

  static SIGNING = class SIGNING {};
  static SIGNINGS = [];

  static DECRYPTION = class DECRYPTION {};
  static DECRYPTIONS = [];

  static PLAINTEXT = class PLAINTEXT {};
  static PLAINTEXTS = [];

  static CIPHERTEXT = class CIPHERTEXT {};
  static CIPHERTEXTS = [];

  static PUBLICKEY = class PUBLICKEY {};
  static PUBLICKEYS = [];

  static PRIVATEKEY = class PRIVATEKEY {};
  static PRIVATEKEYS = [];

  static SYMMETRIC = class SYMMETRIC {};
  static SYMMETRICS = [];

  static ASYMMETRIC = class ASYMMETRIC {};
  static ASYMMETRICS = [];

  static CURVE = class CURVE {};
  static CURVES = [];

  static ELLIPTIC = class ELLIPTIC {};
  static ELLIPTICS = [];

  static RSA = class RSA {};
  static RSAS = [];

  static AES = class AES {};
  static AESES = [];

  static SHA = class SHA {};
  static SHAS = [];

  static HMAC = class HMAC {};
  static HMACS = [];

  static KDF = class KDF {};
  static KDFS = [];

  static PKI = class PKI {};
  static PKIS = [];

  static CA = class CA {};
  static CAS = [];

  static SANDBOX = class SANDBOX {};
  static SANDBOXES = [];

  static ISOLATION = class ISOLATION {};
  static ISOLATIONS = [];

  static CONFINEMENT = class CONFINEMENT {};
  static CONFINEMENTS = [];

  static SECURITY = class SECURITY {};
  static SECURITIES = [];

  static TRUST = class TRUST {};
  static TRUSTS = [];

  static THREAT = class THREAT {};
  static THREATS = [];

  static RISK = class RISK {};
  static RISKS = [];

  static VULNERABILITY = class VULNERABILITY {};
  static VULNERABILITIES = [];

  static EXPLOIT = class EXPLOIT {};
  static EXPLOITS = [];

  static MITIGATION = class MITIGATION {};
  static MITIGATIONS = [];

  static HARDENING = class HARDENING {};
  static HARDENINGS = [];

  static MALWARE = class MALWARE {};
  static MALWARES = [];

  static ROOTKIT = class ROOTKIT {};
  static ROOTKITS = [];

  static INTEGRITY = class INTEGRITY {};
  static INTEGRITIES = [];

  static PROVENANCE = class PROVENANCE {};
  static PROVENANCES = [];

  static ATTESTATION = class ATTESTATION {};
  static ATTESTATIONS = [];

  static FILE = class FILE {};
  static FILES = [];

  static FILESYSTEM = class FILESYSTEM {};
  static FILESYSTEMS = [];

  static DIRECTORY = class DIRECTORY {};
  static DIRECTORIES = [];

  static PATH = class PATH {};
  static PATHS = [];

  static INODE = class INODE {};
  static INODES = [];

  static HANDLE = class HANDLE {};
  static HANDLES = [];

  static DESCRIPTOR = class DESCRIPTOR {};
  static DESCRIPTORS = [];

  static SEEK = class SEEK {};
  static SEEKS = [];

  static MOUNT = class MOUNT {};
  static MOUNTS = [];

  static UNMOUNT = class UNMOUNT {};
  static UNMOUNTS = [];

  static OWNER = class OWNER {};
  static OWNERS = [];

  static SYMLINK = class SYMLINK {};
  static SYMLINKS = [];

  static DEVICE = class DEVICE {};
  static DEVICES = [];

  static DRIVER = class DRIVER {};
  static DRIVERS = [];

  static DEVICEFILE = class DEVICEFILE {};
  static DEVICEFILES = [];

  static CHARACTER = class CHARACTER {};
  static CHARACTERS = [];

  static BLOCKDEVICE = class BLOCKDEVICE {};
  static BLOCKDEVICES = [];

  static TTY = class TTY {};
  static TTIES = [];

  static PTY = class PTY {};
  static PTIES = [];

  static COMMAND = class COMMAND {};
  static COMMANDS = [];

  static COMMANDLINE = class COMMANDLINE {};
  static COMMANDLINES = [];

  static DAEMON = class DAEMON {};
  static DAEMONS = [];

  static SERVICE = class SERVICE {};
  static SERVICES = [];

  static SYSTEMD = class SYSTEMD {};
  static SYSTEMDS = [];

  static IPC = class IPC {};
  static IPCS = [];

  static SHM = class SHM {};
  static SHMS = [];

  static FIFO = class FIFO {};
  static FIFOS = [];

  static DOMAINSOCKET = class DOMAINSOCKET {};
  static DOMAINSOCKETS = [];

  static NAMESPACE = class NAMESPACE {};
  static NAMESPACES = [];

  static CGROUP = class CGROUP {};
  static CGROUPS = [];

  static IMAGE = class IMAGE {};
  static IMAGES = [];

  static LAYER = class LAYER {};
  static LAYERS = [];

  static OVERLAY = class OVERLAY {};
  static OVERLAYS = [];

  static CHROOT = class CHROOT {};
  static CHROOTS = [];

  static EMULATOR = class EMULATOR {};
  static EMULATORS = [];

  static VIRTUALIZATION = class VIRTUALIZATION {};
  static VIRTUALIZATIONS = [];

  static CLOUD = class CLOUD {};
  static CLOUDS = [];

  static DATACENTER = class DATACENTER {};
  static DATACENTERS = [];

  static RACK = class RACK {};
  static RACKS = [];

  static AUTOSCALER = class AUTOSCALER {};
  static AUTOSCALERS = [];

  static ORCHESTRATOR = class ORCHESTRATOR {};
  static ORCHESTRATORS = [];

  static KUBERNETES = class KUBERNETES {};
  static KUBERNETESES = [];

  static POD = class POD {};
  static PODS = [];

  static WORKLOAD = class WORKLOAD {};
  static WORKLOADS = [];

  static SIDECAR = class SIDECAR {};
  static SIDECARS = [];

  static INGRESS = class INGRESS {};
  static INGRESSES = [];

  static EGRESS = class EGRESS {};
  static EGRESSES = [];

  static DATASET = class DATASET {};
  static DATASETS = [];

  static DATAFRAME = class DATAFRAME {};
  static DATAFRAMES = [];

  static DATUM = class DATUM {};
  static DATUMS = [];

  static VALUE = class VALUE {};
  static VALUES = [];

  static KEYVALUE = class KEYVALUE {};
  static KEYVALUES = [];

  static DOCUMENT = class DOCUMENT {};
  static DOCUMENTS = [];

  static COLLECTION = class COLLECTION {};
  static COLLECTIONS = [];

  static QUERY = class QUERY {};
  static QUERIES = [];

  static MATERIALIZATION = class MATERIALIZATION {};
  static MATERIALIZATIONS = [];

  static TRIGGER = class TRIGGER {};
  static TRIGGERS = [];

  static ACID = class ACID {};
  static ACIDS = [];

  static CONSISTENCY = class CONSISTENCY {};
  static CONSISTENCIES = [];

  static DURABILITY = class DURABILITY {};
  static DURABILITIES = [];

  static NORMALIZATION = class NORMALIZATION {};
  static NORMALIZATIONS = [];

  static DENORMALIZATION = class DENORMALIZATION {};
  static DENORMALIZATIONS = [];

  static RELATION = class RELATION {};
  static RELATIONS = [];

  static RELATIONAL = class RELATIONAL {};
  static RELATIONALS = [];

  static REPLICATION = class REPLICATION {};
  static REPLICATIONS = [];

  static BACKUP = class BACKUP {};
  static BACKUPS = [];

  static RESTORE = class RESTORE {};
  static RESTORES = [];

  static RECOVERY = class RECOVERY {};
  static RECOVERIES = [];

  static WAL = class WAL {};
  static WALS = [];

  static LOGSTORE = class LOGSTORE {};
  static LOGSTORES = [];

  static CACHESTORE = class CACHESTORE {};
  static CACHESTORES = [];

  static OBJECTSTORE = class OBJECTSTORE {};
  static OBJECTSTORES = [];

  static BLOB = class BLOB {};
  static BLOBS = [];

  static BLOBSTORE = class BLOBSTORE {};
  static BLOBSTORES = [];

  static FILESTORE = class FILESTORE {};
  static FILESTORES = [];

  static DATASTORE = class DATASTORE {};
  static DATASTORES = [];

  static WAREHOUSE = class WAREHOUSE {};
  static WAREHOUSES = [];

  static LAKE = class LAKE {};
  static LAKES = [];

  static LAKEHOUSE = class LAKEHOUSE {};
  static LAKEHOUSES = [];

  static ETL = class ETL {};
  static ETLS = [];

  static ELT = class ELT {};
  static ELTS = [];

  static INGESTION = class INGESTION {};
  static INGESTIONS = [];

  static EXTRACTION = class EXTRACTION {};
  static EXTRACTIONS = [];

  static TRANSFORMATION = class TRANSFORMATION {};
  static TRANSFORMATIONS = [];

  static STREAMING = class STREAMING {};
  static STREAMINGS = [];

  static BATCH = class BATCH {};
  static BATCHES = [];

  static TOPIC = class TOPIC {};
  static TOPICS = [];

  static CONSUMER = class CONSUMER {};
  static CONSUMERS = [];

  static PRODUCER = class PRODUCER {};
  static PRODUCERS = [];

  static SUBSCRIBER = class SUBSCRIBER {};
  static SUBSCRIBERS = [];

  static PUBLISHER = class PUBLISHER {};
  static PUBLISHERS = [];

  static PUBSUB = class PUBSUB {};
  static PUBSUBS = [];

  static EVENTBUS = class EVENTBUS {};
  static EVENTBUSES = [];

  static EVENTLOOP = class EVENTLOOP {};
  static EVENTLOOPS = [];

  static REACTOR = class REACTOR {};
  static REACTORS = [];

  static PROACTOR = class PROACTOR {};
  static PROACTORS = [];

  static ASYNC = class ASYNC {};
  static ASYNCS = [];

  static AWAIT = class AWAIT {};
  static AWAITS = [];

  static PROMISE = class PROMISE {};
  static PROMISES = [];

  static FUTURE = class FUTURE {};
  static FUTURES = [];

  static OBSERVABLE = class OBSERVABLE {};
  static OBSERVABLES = [];

  static REACTIVE = class REACTIVE {};
  static REACTIVES = [];

  static BACKPRESSURE = class BACKPRESSURE {};
  static BACKPRESSURES = [];

  static THROTTLE = class THROTTLE {};
  static THROTTLES = [];

  static DEBOUNCE = class DEBOUNCE {};
  static DEBOUNCES = [];

  static RATE = class RATE {};
  static RATES = [];

  static LIMIT = class LIMIT {};
  static LIMITS = [];

  static RETRY = class RETRY {};
  static RETRIES = [];

  static TIMEOUT = class TIMEOUT {};
  static TIMEOUTS = [];

  static DEADLINE = class DEADLINE {};
  static DEADLINES = [];

  static CANCELLATION = class CANCELLATION {};
  static CANCELLATIONS = [];

  static ABORT = class ABORT {};
  static ABORTS = [];

  static FAILURE = class FAILURE {};
  static FAILURES = [];

  static ERROR = class ERROR {};
  static ERRORS = [];

  static EXCEPTION = class EXCEPTION {};
  static EXCEPTIONS = [];

  static FAULT = class FAULT {};
  static FAULTS = [];

  static PANIC = class PANIC {};
  static PANICS = [];

  static CRASH = class CRASH {};
  static CRASHES = [];

  static FALLBACK = class FALLBACK {};
  static FALLBACKS = [];

  static CIRCUITBREAKER = class CIRCUITBREAKER {};
  static CIRCUITBREAKERS = [];

  static IDEMPOTENCY = class IDEMPOTENCY {};
  static IDEMPOTENCIES = [];

  static DETERMINISM = class DETERMINISM {};
  static DETERMINISMS = [];

  static NONDETERMINISM = class NONDETERMINISM {};
  static NONDETERMINISMS = [];

  static STATELESS = class STATELESS {};
  static STATELESSES = [];

  static STATEFUL = class STATEFUL {};
  static STATEFULS = [];

  static IMMUTABLE = class IMMUTABLE {};
  static IMMUTABLES = [];

  static MUTABLE = class MUTABLE {};
  static MUTABLES = [];

  static PURE = class PURE {};
  static PURES = [];

  static IMPURE = class IMPURE {};
  static IMPURES = [];

  static SIDE_EFFECT = class SIDE_EFFECT {};
  static SIDE_EFFECTS = [];

  static EFFECT = class EFFECT {};
  static EFFECTS = [];

  static CONTEXT = class CONTEXT {};
  static CONTEXTS = [];

  static LIFETIME = class LIFETIME {};
  static LIFETIMES = [];

  static OWNERSHIP = class OWNERSHIP {};
  static OWNERSHIPS = [];

  static BORROW = class BORROW {};
  static BORROWS = [];

  static REFERENCECOUNT = class REFERENCECOUNT {};
  static REFERENCECOUNTS = [];

  static GARBAGECOLLECTION = class GARBAGECOLLECTION {};
  static GARBAGECOLLECTIONS = [];

  static COLLECTOR = class COLLECTOR {};
  static COLLECTORS = [];

  static ARENA = class ARENA {};
  static ARENAS = [];

  static SLAB = class SLAB {};
  static SLABS = [];

  static RINGBUFFER = class RINGBUFFER {};
  static RINGBUFFERS = [];

  static CIRCULARBUFFER = class CIRCULARBUFFER {};
  static CIRCULARBUFFERS = [];

  static BITMAP = class BITMAP {};
  static BITMAPS = [];

  static BITSET = class BITSET {};
  static BITSETS = [];

  static BLOOMFILTER = class BLOOMFILTER {};
  static BLOOMFILTERS = [];

  static TRIE = class TRIE {};
  static TRIES = [];

  static BTREE = class BTREE {};
  static BTREES = [];

  static BST = class BST {};
  static BSTS = [];

  static PRIORITYQUEUE = class PRIORITYQUEUE {};
  static PRIORITYQUEUES = [];

  static HASHTABLE = class HASHTABLE {};
  static HASHTABLES = [];

  static LINKEDLIST = class LINKEDLIST {};
  static LINKEDLISTS = [];

  static SKIPLIST = class SKIPLIST {};
  static SKIPLISTS = [];

  static DAG = class DAG {};
  static DAGS = [];

  static FOREST = class FOREST {};
  static FORESTS = [];

  static TENSOR = class TENSOR {};
  static TENSORS = [];

  static SPARSE = class SPARSE {};
  static SPARSES = [];

  static DENSE = class DENSE {};
  static DENSES = [];

  static SORT = class SORT {};
  static SORTS = [];

  static MATCH = class MATCH {};
  static MATCHES = [];

  static PATTERN = class PATTERN {};
  static PATTERNS = [];

  static REGEX = class REGEX {};
  static REGEXES = [];

  static AUTOMATON = class AUTOMATON {};
  static AUTOMATONS = [];

  static FSM = class FSM {};
  static FSMS = [];

  static STATEMACHINE = class STATEMACHINE {};
  static STATEMACHINES = [];

  static TRANSITION = class TRANSITION {};
  static TRANSITIONS = [];

  static ACTION = class ACTION {};
  static ACTIONS = [];

  static STORE = class STORE {};
  static STORES = [];

  static CQRS = class CQRS {};
  static CQRSES = [];

  static EVENTSOURCE = class EVENTSOURCE {};
  static EVENTSOURCES = [];

  static SAGA = class SAGA {};
  static SAGAS = [];

  static WORKFLOW = class WORKFLOW {};
  static WORKFLOWS = [];

  static STAGE = class STAGE {};
  static STAGES = [];

  static STEP = class STEP {};
  static STEPS = [];

  static PHASE = class PHASE {};
  static PHASES = [];

  static PASS = class PASS {};
  static PASSES = [];

  static ROUND = class ROUND {};
  static ROUNDS = [];

  static ROUNDTRIP = class ROUNDTRIP {};
  static ROUNDTRIPS = [];

  static SETTLEMENT = class SETTLEMENT {};
  static SETTLEMENTS = [];

  static IDLE = class IDLE {};
  static IDLES = [];

  static ACTIVE = class ACTIVE {};
  static ACTIVES = [];

  static READY = class READY {};
  static READIES = [];

  static WAIT = class WAIT {};
  static WAITS = [];

  static BLOCKED = class BLOCKED {};
  static BLOCKEDS = [];

  static SUSPENDED = class SUSPENDED {};
  static SUSPENDEDS = [];

  static RUNNING = class RUNNING {};
  static RUNNINGS = [];

  static STOPPED = class STOPPED {};
  static STOPPEDS = [];

  static STARTED = class STARTED {};
  static STARTEDS = [];

  static INITIALIZED = class INITIALIZED {};
  static INITIALIZEDS = [];

  static INSTANTIATED = class INSTANTIATED {};
  static INSTANTIATEDS = [];

  static TERMINATED = class TERMINATED {};
  static TERMINATEDS = [];

  static COMPLETED = class COMPLETED {};
  static COMPLETEDS = [];

  static FAILED = class FAILED {};
  static FAILEDS = [];

  static PENDING = class PENDING {};
  static PENDINGS = [];

  static QUEUED = class QUEUED {};
  static QUEUEDS = [];

  static SCHEDULED = class SCHEDULED {};
  static SCHEDULEDS = [];

  static RENDEZVOUS = class RENDEZVOUS {};
  static RENDEZVOUSES = [];

  static MAILBOX = class MAILBOX {};
  static MAILBOXES = [];

  static ACTOR = class ACTOR {};
  static ACTORS = [];

  static SYNCHRONIZATION = class SYNCHRONIZATION {};
  static SYNCHRONIZATIONS = [];

  static COHERENCE = class COHERENCE {};
  static COHERENCES = [];

  static MEMORYMODEL = class MEMORYMODEL {};
  static MEMORYMODELS = [];

  static HAPPENSBEFORE = class HAPPENSBEFORE {};
  static HAPPENSBEFORES = [];

  static RACE = class RACE {};
  static RACES = [];

  static DEADLOCK = class DEADLOCK {};
  static DEADLOCKS = [];

  static LIVELOCK = class LIVELOCK {};
  static LIVELOCKS = [];

  static STARVATION = class STARVATION {};
  static STARVATIONS = [];

  static FAIRNESS = class FAIRNESS {};
  static FAIRNESSES = [];

  static YIELD = class YIELD {};
  static YIELDS = [];

  static PREEMPTION = class PREEMPTION {};
  static PREEMPTIONS = [];

  static COOPERATIVE = class COOPERATIVE {};
  static COOPERATIVES = [];

  static REENTRANCY = class REENTRANCY {};
  static REENTRANCIES = [];

  static REENTRANT = class REENTRANT {};
  static REENTRANTS = [];

  static LOCKFREE = class LOCKFREE {};
  static LOCKFREES = [];

  static WAITFREE = class WAITFREE {};
  static WAITFREES = [];

  static SHADER = class SHADER {};
  static SHADERS = [];

  static FRAGMENT = class FRAGMENT {};
  static FRAGMENTS = [];

  static PIXEL = class PIXEL {};
  static PIXELS = [];

  static TEXEL = class TEXEL {};
  static TEXELS = [];

  static TEXTURE = class TEXTURE {};
  static TEXTURES = [];

  static SAMPLER = class SAMPLER {};
  static SAMPLERS = [];

  static FRAMEBUFFER = class FRAMEBUFFER {};
  static FRAMEBUFFERS = [];

  static RENDERBUFFER = class RENDERBUFFER {};
  static RENDERBUFFERS = [];

  static RENDERPASS = class RENDERPASS {};
  static RENDERPASSES = [];

  static DRAW = class DRAW {};
  static DRAWS = [];

  static CALL = class CALL {};
  static CALLS = [];

  static CANVAS = class CANVAS {};
  static CANVASES = [];

  static SVG = class SVG {};
  static SVGS = [];

  static RASTER = class RASTER {};
  static RASTERS = [];

  static GEOMETRY = class GEOMETRY {};
  static GEOMETRIES = [];

  static POLYGON = class POLYGON {};
  static POLYGONS = [];

  static TRIANGLE = class TRIANGLE {};
  static TRIANGLES = [];

  static QUAD = class QUAD {};
  static QUADS = [];

  static POINT = class POINT {};
  static POINTS = [];

  static BEZIER = class BEZIER {};
  static BEZIERS = [];

  static TRANSFORM = class TRANSFORM {};
  static TRANSFORMS = [];

  static PROJECTION = class PROJECTION {};
  static PROJECTIONS = [];

  static CAMERA = class CAMERA {};
  static CAMERAS = [];

  static SCENE = class SCENE {};
  static SCENES = [];

  static SPRITE = class SPRITE {};
  static SPRITES = [];

  static ANIMATION = class ANIMATION {};
  static ANIMATIONS = [];

  static TIMELINE = class TIMELINE {};
  static TIMELINES = [];

  static COMPOSITOR = class COMPOSITOR {};
  static COMPOSITORS = [];

  static COMPOSITION = class COMPOSITION {};
  static COMPOSITIONS = [];

  static LAYOUT = class LAYOUT {};
  static LAYOUTS = [];

  static STYLE = class STYLE {};
  static STYLES = [];

  static CSS = class CSS {};
  static CSSES = [];

  static DOM = class DOM {};
  static DOMS = [];

  static HTML = class HTML {};
  static HTMLS = [];

  static ELEMENT = class ELEMENT {};
  static ELEMENTS = [];

  static LISTENER = class LISTENER {};
  static LISTENERS = [];

  static KEYBOARD = class KEYBOARD {};
  static KEYBOARDS = [];

  static MOUSE = class MOUSE {};
  static MOUSES = [];

  static TOUCH = class TOUCH {};
  static TOUCHES = [];

  static GESTURE = class GESTURE {};
  static GESTURES = [];

  static FOCUS = class FOCUS {};
  static FOCUSES = [];

  static CLIPBOARD = class CLIPBOARD {};
  static CLIPBOARDS = [];

  static ACCESSIBILITY = class ACCESSIBILITY {};
  static ACCESSIBILITIES = [];

  static ARIA = class ARIA {};
  static ARIAS = [];

  static VIEWPORT = class VIEWPORT {};
  static VIEWPORTS = [];

  static RESPONSIVE = class RESPONSIVE {};
  static RESPONSIVES = [];

  static MEDIAQUERY = class MEDIAQUERY {};
  static MEDIAQUERIES = [];

  static COMPONENT = class COMPONENT {};
  static COMPONENTS = [];

  static WIDGET = class WIDGET {};
  static WIDGETS = [];

  static CONTROL = class CONTROL {};
  static CONTROLS = [];

  static DIALOG = class DIALOG {};
  static DIALOGS = [];

  static MODAL = class MODAL {};
  static MODALS = [];

  static WINDOW = class WINDOW {};
  static WINDOWS = [];

  static TAB = class TAB {};
  static TABS = [];

  static TOOLBAR = class TOOLBAR {};
  static TOOLBARS = [];

  static STATUSBAR = class STATUSBAR {};
  static STATUSBARS = [];

  static SCROLLBAR = class SCROLLBAR {};
  static SCROLLBARS = [];

  static FORM = class FORM {};
  static FORMS = [];

  static INPUT = class INPUT {};
  static INPUTS = [];

  static OUTPUT = class OUTPUT {};
  static OUTPUTS = [];

  static PROMPT = class PROMPT {};
  static PROMPTS = [];

  static TEXTAREA = class TEXTAREA {};
  static TEXTAREAS = [];

  static TEXTFIELD = class TEXTFIELD {};
  static TEXTFIELDS = [];

  static HISTORY = class HISTORY {};
  static HISTORIES = [];

  static COOKIE = class COOKIE {};
  static COOKIES = [];

  static INDEXEDDB = class INDEXEDDB {};
  static INDEXEDDBS = [];

  static SERVICEWORKER = class SERVICEWORKER {};
  static SERVICEWORKERS = [];

  static WEBWORKER = class WEBWORKER {};
  static WEBWORKERS = [];

  static WORKLET = class WORKLET {};
  static WORKLETS = [];

  static AUDIOWORKLET = class AUDIOWORKLET {};
  static AUDIOWORKLETS = [];

  static PAINTWORKLET = class PAINTWORKLET {};
  static PAINTWORKLETS = [];

  static WEBGPU = class WEBGPU {};
  static WEBGPUS = [];

  static WEBGL = class WEBGL {};
  static WEBGLS = [];

  static WEBXR = class WEBXR {};
  static WEBXRS = [];

  static FETCH = class FETCH {};
  static FETCHES = [];

  static REQUEST = class REQUEST {};
  static REQUESTS = [];

  static RESPONSE = class RESPONSE {};
  static RESPONSES = [];

  static BODY = class BODY {};
  static BODIES = [];

  static STATUS = class STATUS {};
  static STATUSES = [];

  static CORS = class CORS {};
  static CORSES = [];

  static CSP = class CSP {};
  static CSPS = [];

  static ORIGIN = class ORIGIN {};
  static ORIGINS = [];

  static SITE = class SITE {};
  static SITES = [];

  static ENGINE = class ENGINE {};
  static ENGINES = [];

  static JAVASCRIPT = class JAVASCRIPT {};
  static JAVASCRIPTS = [];

  static ECMASCRIPT = class ECMASCRIPT {};
  static ECMASCRIPTS = [];

  static NODEJS = class NODEJS {};
  static NODEJSES = [];

  static NPM = class NPM {};
  static NPMS = [];

  static IMPORT = class IMPORT {};
  static IMPORTS = [];

  static EXPORT = class EXPORT {};
  static EXPORTS = [];

  static DYNAMICIMPORT = class DYNAMICIMPORT {};
  static DYNAMICIMPORTS = [];

  static MICROTASK = class MICROTASK {};
  static MICROTASKS = [];

  static MACROTASK = class MACROTASK {};
  static MACROTASKS = [];

  static INTERVAL = class INTERVAL {};
  static INTERVALS = [];

  static THENABLE = class THENABLE {};
  static THENABLES = [];

  static ASYNCITERATOR = class ASYNCITERATOR {};
  static ASYNCITERATORS = [];

  static READABLE = class READABLE {};
  static READABLES = [];

  static WRITABLE = class WRITABLE {};
  static WRITABLES = [];

  static FORM_DATA = class FORM_DATA {};
  static FORM_DATAS = [];

  static URLSEARCHPARAMS = class URLSEARCHPARAMS {};
  static URLSEARCHPARAMSES = [];

  static TEXTENCODER = class TEXTENCODER {};
  static TEXTENCODERS = [];

  static TEXTDECODER = class TEXTDECODER {};
  static TEXTDECODERS = [];

  static ABORTCONTROLLER = class ABORTCONTROLLER {};
  static ABORTCONTROLLERS = [];

  static ABORTSIGNAL = class ABORTSIGNAL {};
  static ABORTSIGNALS = [];

  static AI = class AI {};
  static AIS = [];

  static ML = class ML {};
  static MLS = [];

  static TRAINING = class TRAINING {};
  static TRAININGS = [];

  static INFERENCE = class INFERENCE {};
  static INFERENCES = [];

  static SAMPLE = class SAMPLE {};
  static SAMPLES = [];

  static OPTIMIZER = class OPTIMIZER {};
  static OPTIMIZERS = [];

  static LOSS = class LOSS {};
  static LOSSES = [];

  static GRADIENT = class GRADIENT {};
  static GRADIENTS = [];

  static NEURON = class NEURON {};
  static NEURONS = [];

  static WEIGHT = class WEIGHT {};
  static WEIGHTS = [];

  static BIAS = class BIAS {};
  static BIASES = [];

  static ACTIVATION = class ACTIVATION {};
  static ACTIVATIONS = [];

  static EMBEDDING = class EMBEDDING {};
  static EMBEDDINGS = [];

  static ATTENTION = class ATTENTION {};
  static ATTENTIONS = [];

  static TRANSFORMER = class TRANSFORMER {};
  static TRANSFORMERS = [];

  static RETRIEVAL = class RETRIEVAL {};
  static RETRIEVALS = [];

  static RANKER = class RANKER {};
  static RANKERS = [];

  static CLASSIFIER = class CLASSIFIER {};
  static CLASSIFIERS = [];

  static REGRESSOR = class REGRESSOR {};
  static REGRESSORS = [];

  static CLUSTERING = class CLUSTERING {};
  static CLUSTERINGS = [];

  static PLANNER = class PLANNER {};
  static PLANNERS = [];

  static REASONER = class REASONER {};
  static REASONERS = [];

  static EVALUATION = class EVALUATION {};
  static EVALUATIONS = [];

  static PRECISION = class PRECISION {};
  static PRECISIONS = [];

  static RECALL = class RECALL {};
  static RECALLS = [];

  static ACCURACY = class ACCURACY {};
  static ACCURACIES = [];

  static QUANTIZATION = class QUANTIZATION {};
  static QUANTIZATIONS = [];

  static DISTILLATION = class DISTILLATION {};
  static DISTILLATIONS = [];

  static FORMALISM = class FORMALISM {};
  static FORMALISMS = [];

  static THEOREM = class THEOREM {};
  static THEOREMS = [];

  static PROOF = class PROOF {};
  static PROOFS = [];

  static AXIOM = class AXIOM {};
  static AXIOMS = [];

  static INVARIANT = class INVARIANT {};
  static INVARIANTS = [];

  static PRECONDITION = class PRECONDITION {};
  static PRECONDITIONS = [];

  static POSTCONDITION = class POSTCONDITION {};
  static POSTCONDITIONS = [];

  static PREDICATE = class PREDICATE {};
  static PREDICATES = [];

  static CATEGORY = class CATEGORY {};
  static CATEGORIES = [];

  static ALGEBRA = class ALGEBRA {};
  static ALGEBRAS = [];

  static CALCULUS = class CALCULUS {};
  static CALCULUSES = [];

  static PROPOSITION = class PROPOSITION {};
  static PROPOSITIONS = [];

  static HEXADECIMAL = class HEXADECIMAL {};
  static HEXADECIMALS = [];

  static OCTAL = class OCTAL {};
  static OCTALS = [];

  static RADIX = class RADIX {};
  static RADIXES = [];

  static ENDIAN = class ENDIAN {};
  static ENDIANS = [];

  static ENDIANNESS = class ENDIANNESS {};
  static ENDIANNESSES = [];

  static IEEE754 = class IEEE754 {};
  static IEEE754S = [];

  static UNICODE = class UNICODE {};
  static UNICODES = [];

  static UTF8 = class UTF8 {};
  static UTF8S = [];

  static UTF16 = class UTF16 {};
  static UTF16S = [];

  static UTF32 = class UTF32 {};
  static UTF32S = [];

  static ASCII = class ASCII {};
  static ASCIIS = [];

  static CODEPOINT = class CODEPOINT {};
  static CODEPOINTS = [];

  static GRAPHEME = class GRAPHEME {};
  static GRAPHEMES = [];

  static GLYPH = class GLYPH {};
  static GLYPHS = [];

  static STRING = class STRING {};
  static STRINGS = [];

  static LOCALE = class LOCALE {};
  static LOCALES = [];

  static COLLATION = class COLLATION {};
  static COLLATIONS = [];

  static TIME = class TIME {};
  static TIMES = [];

  static DATE = class DATE {};
  static DATES = [];

  static DURATION = class DURATION {};
  static DURATIONS = [];

  static INSTANT = class INSTANT {};
  static INSTANTS = [];

  static TIMESTAMP = class TIMESTAMP {};
  static TIMESTAMPS = [];

  static TIMEZONE = class TIMEZONE {};
  static TIMEZONES = [];

  static MONOTONIC = class MONOTONIC {};
  static MONOTONICS = [];

  static WALLCLOCK = class WALLCLOCK {};
  static WALLCLOCKS = [];

  static FREQUENCY = class FREQUENCY {};
  static FREQUENCIES = [];

  static PERIOD = class PERIOD {};
  static PERIODS = [];

  static JITTER = class JITTER {};
  static JITTERS = [];

  static DRIFT = class DRIFT {};
  static DRIFTS = [];

  static NTP = class NTP {};
  static NTPS = [];

  static PTP = class PTP {};
  static PTPS = [];
}

class V0 {
  static NAME = 'Haamu V0';
  static VERSION = '0';
  static STATE = 'scaffold';

  static VERSIONS = Object.create(null);

  static scaffold(version, construct) {
    this.VERSIONS[version] = construct;
    return construct;
  }
}

globalThis.V2 = V2;
globalThis.V1 = V1;
globalThis.V0 = V0;
