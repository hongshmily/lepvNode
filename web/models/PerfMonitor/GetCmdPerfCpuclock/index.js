
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdPerfCpuclockCommander = function() {
    LepvCommandProto.call(this, 'GetCmdPerfCpuclock');
};

GetCmdPerfCpuclockCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdPerfCpuclockCommander.prototype.constructor = GetCmdPerfCpuclockCommander;

// "# ========",
//     "# captured on: Sun Mar 19 11:49:15 2017",
//     "# hostname : ubuntu",
//     "# os release : 3.13.0-77-generic",
//     "# perf version : 3.13.11-ckt32",
//     "# arch : x86_64",
//     "# nrcpus online : 2",
//     "# nrcpus avail : 2",
//     "# cpudesc : QEMU Virtual CPU version 2.0.0",
//     "# cpuid : AuthenticAMD,6,6,3",
//     "# total memory : 243644 kB",
//     "# cmdline : /usr/lib/linux-tools-3.13.0-77/perf record -a -e cpu-clock sleep 1 ",
//     "# event : name = cpu-clock, type = 1, config = 0x0, config1 = 0x0, config2 = 0x0, excl_usr = 0, excl_kern = 0, excl_host = 0, excl_guest = 1, precise_ip = 0, attr_mmap2 = 0, attr_mmap  = 1, attr_mmap_data = 0",
//     "# HEADER_CPU_TOPOLOGY info available, use -I to display",
//     "# HEADER_NUMA_TOPOLOGY info available, use -I to display",
//     "# pmu mappings: software = 1, tracepoint = 2, breakpoint = 5",
//     "# ========",
//     "#",
//     "# Samples: 5K of event 'cpu-clock'",
//     "# Event count (approx.): 1330000000",
//     "#",
//     "# Overhead      Command       Shared Object                                   Symbol",
//     "# ........  ...........  ..................  .......................................",
//     "#",
//     "    30.30%      swapper  [kernel.kallsyms]   [k] native_safe_halt                   ",
//     "    12.39%        sleep  ld-2.19.so          [.] 0x0000000000004b1f                 ",
//     "     6.94%         perf  [kernel.kallsyms]   [k] __do_softirq                       ",
//     "     5.26%        sleep  [kernel.k,allsyms]   [k] __do_softirq                       ",
//     "     3.93%        sleep  libc-2.19.so        [.] 0x0000000000022100                 ",
//     "     1.52%        sleep  [kernel.kallsyms]   [k] __do_page_fault                    ",
//     "     1.05%         perf  [kernel.kallsyms]   [k] ext4_mark_iloc_dirty               ",
//     "     0.75%         perf  [kernel.kallsyms]   [k] finish_task_switch                 ",
//     "     0.75%         perf  [kernel.kallsyms]   [k] __generic_file_aio_write           ",
//     "     0.70%         perf  [kernel.kallsyms]   [k] _cond_resched                      ",
//     "     0.64%         perf  [kernel.kallsyms]   [k] ext4_da_write_begin                ",
//     "     0.64%         perf  [kernel.kallsyms]   [k] _raw_spin_unlock_irqrestore        ",
//     "     0.62%         perf  [kernel.kallsyms]   [k] vfs_write                          ",
//     "     0.58%        sleep  [kernel.kallsyms]   [k] handle_mm_fault                    ",
//     "     0.58%         perf  [kernel.kallsyms]   [k] __do_page_fault                    ",
//     "     0.55%        sleep  sleep               [.] 0x0000000000004390                 ",
//     "     0.53%         perf  [kernel.kallsyms]   [k] fsnotify                           ",
//     "     0.51%         perf  perf                [.] 0x0000000000015ada                 ",
//     "     0.47%         perf  [kernel.kallsyms]   [k] iov_iter_fault_in_readable         ",
//     "     0.45%        sleep  [kernel.kallsyms]   [k] filemap_fault                      ",
//     "     0.45%         perf  [kernel.kallsyms]   [k] start_this_handle                  ",
//     "     0.43%         perf  [kernel.kallsyms]   [k] __mark_inode_dirt,y                 ",
//     "     0.41%         perf  [kernel.kallsyms]   [k] kmem_cache_alloc                   ",
//     "     0.41%         perf  [kernel.kallsyms]   [k] jbd2_journal_stop                  ",
//     "     0.39%         perf  [kernel.kallsyms]   [k] wake_up_bit                        ",
//     "     0.39%         perf  [kernel.kallsyms]   [k] ext4_journal_check_start           ",
//     "     0.36%         perf  [kernel.kallsyms]   [k] ext4_da_write_end                  ",
//     "     0.36%         perf  [kernel.kallsyms]   [k] __ext4_journal_stop                ",
//     "     0.36%         perf  [kernel.kallsyms]   [k] do_get_write_access                ",
//     "     0.36%         perf  [kernel.kallsyms]   [k] __percpu_counter_add               ",
//     "     0.34%         perf  [kernel.kallsyms]   [k] get_page_from_freelist             ",
//     "     0.34%         perf  [kernel.kallsyms]   [k] __block_write_begin                ",
//     "     0.32%         perf  [kernel.kallsyms]   [k] generic_segment_checks             ",
//     "     0.32%         perf  [kernel.kallsyms]   [k] __find_get_block                   ",
//     "     0.32%         perf  [kernel.kallsyms]   [k] jbd2__journal_start                ",
//     "     0.30%        sleep  libc-2.19.so        [.] setlocale                          ",
//     "     0.30%         perf  [kernel.kallsyms]   [k] generic_file_buffered_write        ",
//     "     0.30%         perf  [kern,el.kallsyms]   [k] unlock_page                        ",
//     "     0.30%         perf  [kernel.kallsyms]   [k] kmem_cache_free,                    ",
//     "     0.28%         perf  [kernel.kallsyms]   [k] page_mapping                       ",
//     "     0.26%         perf  [kernel.kallsyms]   [k] current_kernel_time                ",
//     "     0.26%         perf  [kernel.kallsyms]   [k] ext4_mark_inode_dirty              ",
//     "     0.26%         perf  [kernel.kallsyms]   [k] copy_user_generic_unrolled         ",
//     "     0.24%         perf  [kernel.kallsyms]   [k] run_timer_softirq                  ",
//     "     0.24%         perf  [kernel.kallsyms]   [k] __wake_up_bit                      ",
//     "     0.24%         perf  [kernel.kallsyms]   [k] fget_light                         ",
//     "     0.24%         perf  [kernel.kallsyms]   [k] generic_write_sync                 ",
//     "     0.24%         perf  [kernel.kallsyms]   [k] ext4_get_group_desc                ",
//     "     0.23%         perf  [kernel.kallsyms]   [k] current_fs_time                    ",
//     "     0.23%         perf  [kernel.kallsyms]   [k] find_get_page                      ",
//     "     0.23%         perf  [kernel.kallsyms]   [k] file_update_time                   ",
//     "     0.23%         perf  [kernel.kallsyms]   [k] __ext4_get_inode_loc               ",
//     "     0.23%         perf  [kernel.kallsyms]   [k] __ext4_handle_dirty_metadata       ",
//     "     0.21%        sleep  [kernel.kallsyms]   [k] perf_event_mmap_output             ",
//     "     0.21%  ksoftirqd/0  [ke,rnel.kallsyms]   [k] finish_task_switch                 ",
//     "     0.21%    rcu_sched  [kernel.kallsyms]   [k] rcu_gp_kthrea,d                     ",
//     "     0.21%         perf  [kernel.kallsyms]   [k] __block_commit_write.isra.21       ",
//     "     0.21%         perf  [kernel.kallsyms]   [k] ext4_dirty_inode                   ",
//     "     0.21%         perf  [kernel.kallsyms]   [k] jbd2_journal_dirty_metadata        ",
//     "     0.19%        sleep  libc-2.19.so        [.] _dl_addr                           ",
//     "     0.19%        sleep  ld-2.19.so          [.] __libc_memalign                    ",
//     "     0.19%        sleep  [kernel.kallsyms]   [k] perf_event_mmap                    ",
//     "     0.19%        sleep  [kernel.kallsyms]   [k] kmem_cache_free                    ",
//     "     0.19%      rcuos/1  [kernel.kallsyms]   [k] _raw_spin_unlock_irqrestore        ",
//     "     0.19%         perf  [kernel.kallsyms]   [k] ext4_inode_table                   ",
//     "     0.19%         perf  [kernel.kallsyms]   [k] radix_tree_lookup_element          ",
//     "     0.19%         perf  [kernel.kallsyms]   [k] memset                             ",
//     "     0.19%         perf  [kernel.kallsyms]   [k] system_call_after_swapgs           ",
//     "     0.17%        sleep  libc-2.19.so        [.] malloc                             ",
//     "     0.17%        sleep  [kernel.kallsyms]   [k] __raw_write_unlock_irq.constprop.11",
//     "     0.17%        sleep  [kernel.kallsyms]   [k] __do_fault                         ",
//     "     0.17%        sleep  [kernel.kallsyms]   [k] page_add_file_rmap                 ",
//     "     0.17%    rcu_sched  [kernel.kallsyms]   [k] finish_task,_switch                 ",
//     "     0.17%      rcuos/1  [kernel.kallsyms]   [k] finish_task_switch                 ",
//     "     0.17%  ksoftirqd/1  [kernel.kallsyms]   [k] finish_task_switch                 ",
//     "     0.17%         perf  [kernel.kallsyms]   [k] generic_exec_single                ",
//     "     0.17%         perf  [kernel.kallsyms]   [k] sys_write                          ",
// "     0.15%        sleep  [kernel.kallsyms]   [k] finish_task_switch                 ",
// "     0.15%        sleep  [kernel.kallsyms]   [k] get_page_from_freelist             ",
// "     0.15%        sleep  [kernel.kallsyms]   [k] retint_careful                     ",
// "     0.15%         perf  [kernel.kallsyms]   [k] perf_mmap_fault                    ",
// "     0.15%         perf  [kernel.kallsyms]   [k] add_to_page_cache_locked           ",
// "     0.15%         perf  [kernel.kallsyms]   [k] mark_page_accessed                 ",
// "     0.15%         perf  [kernel.kallsyms]   [k] __sb_end_write                     ",
// "     0.15%         perf  [ke"
GetCmdPerfCpuclockCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = [];
    var dataCount = 25;

    try {
        // Done by Ting
        var line = lines.shift();
        while( lines.length > 0 && !line.match(/#\s+Overhead/)) {
            line = lines.shift();
        }

        if (lines.length == 0) {
            parsedData['parsed']['error'] = 'Failed to locate a header line beginning with "# Overhead..."';
            return parsedData;
        }

        var headerColumns = line.trim().replace(/#\s+Overhead\s*/, '').split(/\s+/);
        while (lines.length > 0) {
            line = lines.shift().trim();
            if (line == "" || line.startsWith('#')) {
                continue
            }

            var lineValues = line.split(/\s+/);
            if (lineValues.length < 5) {
                continue;
            }
            if (lineValues[0].indexOf('%') < 0) {
                continue;
            }

            var resultLine = {};
            resultLine['Overhead'] = lineValues[0];
            resultLine["Command"] = lineValues[1];
            resultLine["Shared Object"] = lineValues[2];
            resultLine['Symbol'] = lineValues.slice(3).join(' ');

            parsedData['parsed'].push(resultLine);
            if (parsedData['parsed'].length >= dataCount) break

        }
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdPerfCpuclockCommander();